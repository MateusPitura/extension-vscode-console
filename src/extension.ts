import * as vscode from "vscode";
import {
  languageMappingsWithoutText,
  languageMappingsWithText,
} from "./constants/configs";

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "Star Console" is now active!');

  const insertLogStatement = vscode.commands.registerCommand(
    "star-console.insertLogStatement",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const text = editor.selections.map((sel: vscode.Selection) =>
        editor.document.getText(sel)
      );
      if (text[0]) {
        vscode.commands
          .executeCommand("editor.action.insertLineAfter")
          .then<void>(() => {
            text.reduce((acc: Promise<any>, _text: string, index: number) => {
              return acc.then((res) => {
                return new Promise<void>((resolve) => {
                  const logToInsert = getLogStatementWithText(
                    _text,
                    editor.document.languageId
                  );
                  const range = new vscode.Range(
                    editor.selections[index].start,
                    editor.selections[index].end
                  );
                  editor
                    .edit((editBuilder: vscode.TextEditorEdit) => {
                      editBuilder.replace(range, logToInsert);
                    })
                    .then(() => resolve());
                });
              });
            }, Promise.resolve());
          });
        return;
      }
      text
        .reduce((acc: Promise<any>, _text: string, index: number) => {
          return acc.then((res) => {
            return new Promise<void>((resolve) => {
              const logToInsert = getLogStatementWithoutText(
                editor.document.languageId
              );
              const range = new vscode.Range(
                editor.selections[index].start,
                editor.selections[index].end
              );
              editor
                .edit((editBuilder: vscode.TextEditorEdit) => {
                  editBuilder.replace(range, logToInsert);
                })
                .then(() => resolve());
            });
          });
        }, Promise.resolve())
        .then(() => cursorPlacement());
      return;
    }
  );
  context.subscriptions.push(insertLogStatement);
}

function cursorPlacement() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  const position = editor.selection.active;
  const lineText = editor.document.lineAt(position.line).text;
  const indexOfChar = lineText.indexOf("🌠");

  if (indexOfChar !== -1) {
    const newPosition = position.with(position.line, indexOfChar + 3);
    const newSelection = new vscode.Selection(newPosition, newPosition);
    editor.selection = newSelection;
  }
}

function getLogStatementWithText(logText: string, languageId: string): string {
  const templateText = languageMappingsWithText[languageId];
  if (!templateText) {
    vscode.window.showErrorMessage(
      `The language used in this file is not supported.`
    );
    return "";
  }

  const logStatement = templateText.replace(/\{selectedSnippet\}/g, logText);
  return logStatement;
}

function getLogStatementWithoutText(languageId: string): string {
  const templateText = languageMappingsWithoutText[languageId];
  if (!templateText) {
    vscode.window.showErrorMessage(
      `The language used in this file is not supported.`
    );
    return "";
  }
  return templateText;
}

export function deactivate() {}
