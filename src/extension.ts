'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.sauveQuiPeut', async () => {
        await withActiveDocument((doc) => trySave(doc));
    });

    context.subscriptions.push(disposable);
}

async function withActiveDocument(action: (doc : vscode.TextDocument) => Promise<void>) {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }

    const doc = activeEditor.document;
    if (!doc) {
        return;
    }

    await action(doc);
}


async function trySave(doc : vscode.TextDocument) : Promise<void> {
    if (doc.isUntitled) {
        const saved = await doc.save();
        vscode.window.showInformationMessage(`Document ${saved ? "was" : "was not"} saved. Check document is still open.`);
    } else {
        vscode.window.showErrorMessage('Please test on an unsaved document');
    }
}

export function deactivate() {
}