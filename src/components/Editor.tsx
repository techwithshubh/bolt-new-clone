import { autocompletion, completionKeymap } from "@codemirror/autocomplete";
import {
    SandpackProvider,
    SandpackPreview,
    SandpackCodeEditor,
    SandpackFileExplorer
} from "@codesandbox/sandpack-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export const Editor = () => (

    <SandpackProvider
        template="react-ts"
        theme="dark"
        files={{
            'components/Button.tsx': `export default () => {
  return <button>Hello</button>
};`
        }}
        customSetup={{
            dependencies: {
                "react-markdown": "latest"
            }
        }}
        options={{
            externalResources: ["https://cdn.tailwindcss.com"],
            bundlerURL: "http://localhost:8080"
        }}
    >
        <div className="grid grid-cols-5 min-h-[95vh] m-4 pt-2 border rounded-md">
            <SandpackFileExplorer className="col-span-1" />
            <Tabs defaultValue="editor" className="col-span-4 border-l">
                <TabsList className="ml-2">
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="editor">
                    <SandpackCodeEditor
                        className="min-h-[90vh]"
                        showLineNumbers={true}
                        showRunButton={true}
                        wrapContent
                        closableTabs
                        extensions={[autocompletion()]}
                        //@ts-expect-error Missing Properties
                        extensionsKeymap={[completionKeymap]}
                    />
                </TabsContent>
                <TabsContent value="preview">
                    <SandpackPreview
                        className="min-h-[90vh]"
                        showOpenInCodeSandbox={false}
                        showNavigator={true}
                        showRefreshButton={true} />
                </TabsContent>
            </Tabs>
        </div>
    </SandpackProvider>
);

