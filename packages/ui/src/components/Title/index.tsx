import './Title.scss'

type headingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"


type CustomTitleProps<T extends headingTag> = {
    text: string,
    fontSize?: string,
    as?: T
    
}


// Componente de título personalizado
const CustomTitle = ({text, as = "h1"}: CustomTitleProps<headingTag>) => {
    const Tag = as || "h1"
  return (
    
    <Tag className="Title">
        {text}
    </Tag>
  )
}

export default CustomTitle