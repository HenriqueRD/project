import style from './styles.module.css'

type TagProps = {
  text: string
  type: "primary" | "success" | "alert" | "danger" | "normal"
}

export default function Tag({ text, type } : TagProps) {

  return (
    <span id={style.tag} className={style[type]}>
      {text}
    </span>
  )
}