import promptSync from "prompt-sync";
const prompt = promptSync();

export default function askUserString() {
    const answer = prompt("=> ").trim();
    return answer;
}