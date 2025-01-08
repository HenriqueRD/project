import style from './styles.module.css'

type TagProps = {
  text: string
  type?: "primary" | "success" | "alert" | "danger" | "normal"
}

export default function Tag({ text, type } : TagProps) {

  return (
    <span id={style.tag} className={`${style[type || ""]} ${style[parseTagType(text)]}`}>
      {parseText(text)}
    </span>
  )
}

function parseTagType(text : string) {
  if (text === "EM_PREPARACAO" || text === "EM_ABERTO") return "alert"
  else if (text === "PAGO" || text === "FINALIZADO" || text === "ENTRADA") return "success"
  else if (text === "LOCAL") return "normal"
  else if (text === "CONCLUIDO" || text === "LEVAR") return "primary"
  else if (text === "SAIDA") return "danger"
  else return text
}

function parseText(text : string) {
  if (text === "EM_PREPARACAO") return "em preparação"
  else if (text === "EM_ABERTO") return "em aberto"
  else if (text === "SAIDA") return "saída"
  else return text
}