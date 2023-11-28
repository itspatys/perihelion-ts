import { Button } from "@nextui-org/react"

import { Node } from "../../../../../../../data/configuration-file.interface"
import { useDispatch } from "../../../../../../store/store"
import { setFile } from "../../../../../../store/workflowSlice"
import RichImage from "../RichImage"

const Input = ({ nodeProps, mime }: { nodeProps: Node; mime: string }) => {
    const dispatch = useDispatch()
    return (
        <div className="h-[calc(32px*4)] mt-2 flex justify-center">
            {!nodeProps.data.file ? (
                <Button
                    size="lg"
                    variant="bordered"
                    className="w-full"
                    onClick={async () => {
                        const file = await window.api.nodes.loadImage(
                            nodeProps.id,
                        )
                        dispatch(
                            setFile({
                                id: nodeProps.id,
                                file: file,
                            }),
                        )
                    }}
                >
                    Load image from file
                </Button>
            ) : (
                <RichImage mime={mime} />
            )}
        </div>
    )
}

export default Input
