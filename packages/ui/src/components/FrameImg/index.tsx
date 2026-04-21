import './FrameImg.css';

type FrameImgProps = {
    children?: React.ReactNode,
    height?: number,
    width?: number
}

// Um frame básico da aplicação que possui uma imagem de background

const FrameImg = ({ children, height = 576, width = 1024 }: FrameImgProps) => {

    return (
        <div style={{ height, width}} className="FrameImg">
            {children}
        </div>
    )
}
    

export default FrameImg