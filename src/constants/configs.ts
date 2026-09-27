import { Languages } from "../types";

export const languageMappingsWithText = {
  c: 'printf("🌠 ({counter}) {selectedSnippet}: %d\\n", {selectedSnippet});',
  cpp: 'cout << "🌠 $({counter}) {selectedSnippet}: " << {selectedSnippet} << endl;',
  go: 'fmt.Println("🌠 $({counter}) {selectedSnippet}:", {selectedSnippet})',
  java: 'System.out.println("🌠 ({counter}) {selectedSnippet}: " + {selectedSnippet});',
  html: "console.log('🌠 ({counter}) {selectedSnippet}: ', {selectedSnippet});",
  javascript: "console.log('🌠 ({counter}) {selectedSnippet}: ', {selectedSnippet});",
  javascriptreact: "console.log('🌠 ({counter}) {selectedSnippet}: ', {selectedSnippet});",
  php: "echo '<pre>';\necho '🌠 ({counter}) ${selectedSnippet}: ';\nvar_dump(${selectedSnippet});\ndie;",
  ruby: 'puts "🌠 ({counter}) {selectedSnippet}: #\{{selectedSnippet}.pretty_inspect\}"',
  python: 'print(f"🌠 ({counter}) {selectedSnippet}: {{selectedSnippet}}")',
  typescript: "console.log('🌠 ({counter}) {selectedSnippet}: ', {selectedSnippet});",
  typescriptreact: "console.log('🌠 ({counter}) {selectedSnippet}: ', {selectedSnippet});",
  vue: "console.log('🌠 ({counter}) {selectedSnippet}: ', {selectedSnippet});",
  shellscript: 'echo "🌠 ({counter}) {selectedSnippet}: ${selectedSnippet}"',
  rust: 'println!("🌠 ({counter}) {selectedSnippet}: {:?}", {selectedSnippet});',
};

export const languageMappingsWithoutText: Record<Languages, string> = {
  c: 'printf("🌠 ({counter}) \\n");',
  cpp: 'cout << "🌠 ({counter}) " << endl;',
  go: 'fmt.Println("🌠 ({counter}) ")',
  java: 'System.out.println("🌠 ({counter}) ");',
  html: "console.log('🌠 ({counter}) ');",
  javascript: "console.log('🌠 ({counter}) ');",
  javascriptreact: "console.log('🌠 ({counter}) ');",
  php: "echo '<pre>';\necho '🌠 ({counter}) ';\nvar_dump();\ndie;",
  python: 'print(f"🌠 ({counter}) ")',
  ruby: 'puts "🌠 ({counter}) "',
  typescript: "console.log('🌠 ({counter}) ');",
  typescriptreact: "console.log('🌠 ({counter}) ');",
  vue: "console.log('🌠 ({counter}) ');",
  shellscript: 'echo "🌠 ({counter}) "',
  rust: 'println!("🌠 ({counter}) ");',
};
