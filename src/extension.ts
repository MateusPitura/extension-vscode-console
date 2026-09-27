import * as vscode from "vscode";
import { GLOBAL_STATE_KEY } from "./constants";
import {
  languageMappingsWithoutText,
  languageMappingsWithText,
} from "./constants/configs";
import { Languages } from "./types";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "Star Console" is now active!');

  const insertLogStatement = vscode.commands.registerCommand(
    "star-console.insertLogStatement",
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const text = editor.selections.map((sel: vscode.Selection) =>
        editor.document.getText(sel),
      );

      if (text[0]) {
        await vscode.commands.executeCommand("editor.action.insertLineAfter");

        const logToInsert = await getLogStatementWithText(
          text[0],
          editor.document.languageId,
          context,
        );

        const range = new vscode.Range(
          editor.selections[0].start,
          editor.selections[0].end,
        );

        await editor.edit((editBuilder: vscode.TextEditorEdit) => {
          editBuilder.replace(range, logToInsert);
        });

        return;
      }

      const logToInsert = await getLogStatementWithoutText(
        editor.document.languageId,
        context,
      );

      const range = new vscode.Range(
        editor.selections[0].start,
        editor.selections[0].end,
      );

      await editor.edit((editBuilder: vscode.TextEditorEdit) => {
        editBuilder.replace(range, logToInsert);
      });

      cursorPlacement();

      return;
    },
  );

  const resetCounter = vscode.commands.registerCommand(
    "star-console.resetCounter",
    async () => {
      await context.globalState.update(GLOBAL_STATE_KEY, 0);
    }
  );

  context.subscriptions.push(insertLogStatement);
  context.subscriptions.push(resetCounter);
}

function cursorPlacement() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const position = editor.selection.active;
  const lineText = editor.document.lineAt(position.line).text;

  const markerIndex = lineText.indexOf("🌠");

  if (markerIndex !== -1) {
    const closingParenIndex = lineText.indexOf(")", markerIndex);

    if (closingParenIndex !== -1) {
      const newPosition = position.with(position.line, closingParenIndex + 2);

      editor.selection = new vscode.Selection(newPosition, newPosition);
    }
  }
}

async function getLogStatementWithText(
  logText: string,
  languageId: string,
  context: vscode.ExtensionContext,
): Promise<string> {
  const templateText = languageMappingsWithText[languageId as Languages];

  if (!templateText) {
    vscode.window.showErrorMessage(
      `The language used in this file is not supported.`,
    );
    return "";
  }

  const counter = context.globalState.get<number>(GLOBAL_STATE_KEY, 0);

  const logStatement = templateText
    .replace(/\{selectedSnippet\}/g, logText)
    .replace(/\{counter\}/g, counter.toString());

  await context.globalState.update(GLOBAL_STATE_KEY, counter + 1);

  return logStatement;
}

async function getLogStatementWithoutText(
  languageId: string,
  context: vscode.ExtensionContext,
): Promise<string> {
  const templateText = languageMappingsWithoutText[languageId as Languages];

  if (!templateText) {
    vscode.window.showErrorMessage(
      `The language ${languageId} used in this file is not supported.`,
    );
    return "";
  }

  const counter = context.globalState.get<number>(GLOBAL_STATE_KEY, 0);

  const logStatement = templateText.replace(/\{counter\}/g, counter.toString());

  await context.globalState.update(GLOBAL_STATE_KEY, counter + 1);

  return logStatement;
}

export function deactivate() {}
