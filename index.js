import '@logseq/libs';

//Embed Excalidraw when called
async function insertExclidraw (e) {
  console.log('Open the calendar!')
  const room = Array.from(window.crypto.getRandomValues(new Uint8Array(10))).map((byte) => `0${byte.toString(16)}`.slice(-2)).join("");
  const key = (await window.crypto.subtle.exportKey("jwk",await window.crypto.subtle.generateKey({name:"AES-GCM",length:128},true,["encrypt", "decrypt"]))).k;
  
  logseq.Editor.insertBlock(e.uuid, `<iframe src="https://excalidraw.com/#room=${room},${key}" scrolling="YES" style="width: 100%; height: 700px"></iframe>`, {sibling: true})
}
  
const main = async () => {
  logseq.Editor.registerSlashCommand('Insert Excalidraw', async (e) => {
    insertExclidraw(e)
  }    
)}

logseq.ready(main).catch(console.error);
