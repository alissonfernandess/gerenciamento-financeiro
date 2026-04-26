import './FrameImg.scss';

type FrameImgProps = {
    children?: React.ReactNode,
    height?: number,
    width?: number
    backgroundImage?: string,
    className?: string
}

// Um frame básico da aplicação que possui uma imagem de background

const FrameImg = ({ children, height = 576, width = 1024, backgroundImage, className }: FrameImgProps) => {

    return (
        <div style={{ height, width, backgroundImage: `url(${backgroundImage})` }} className={`FrameImg ${className || ''}`}>
            {children}
        </div>
    )
}
    

export default FrameImg