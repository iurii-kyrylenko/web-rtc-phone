import css from "./Header.module.css";

const Header = ({ title }) => {
  return (
    <header className={css.header}>
      <span className={css.title}>{title}</span>
    </header>
  );
};

export { Header };
