import css from "./Info.module.css";

const Info = ({ text, isMessage }) => {
  const style = isMessage ? css.message : css.prompt;

  return (
    <div className={css.info}>
      <span className={style}>{text}</span>
    </div>
  );
};

export { Info };
