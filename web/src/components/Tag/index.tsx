import style from './styles.module.css'

type TagProps = {
  text: string
  type?: "primary" | "success" | "alert" | "danger" | "normal"
}

export default function Tag({ text, type } : TagProps) {

  return (
    <span id={style.tag} className={`${style[type || ""]} ${style[parseTagType(text)]}`}>
      {text}
    </span>
  )
}

function parseTagType(text : string) {
  if (text === "em preparação" || text === "em aberto") return "alert"
  else if (text === "pago" || text === "finalizado") return "success"
  else if (text === "cancelado") return "danger"
  else if (text === "local") return "normal"
  else if (text === "concluído" || text === "levar") return "primary"
  else return text
}