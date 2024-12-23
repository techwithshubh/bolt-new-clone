import Chat  from "@/components/Chat";
import { Editor } from "@/components/Editor";

export default function Workbench() {
  return (
    <div className="grid grid-cols-5 h-screen gap-4">
        <div className="col-span-2">
            <Chat />
        </div>
        <div className="col-span-3">
            <Editor />
        </div>
    </div>
  )
}
