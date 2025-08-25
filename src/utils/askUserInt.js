import promptSync from "prompt-sync";
const prompt = promptSync();

export default function askUserInt() {
    const answer = parseInt(prompt("=> ").trim());
    return answer;
}