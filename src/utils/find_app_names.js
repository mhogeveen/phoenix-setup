/**
 * Finding Application Names
 * to find application names run the following command
 * open the app you're interested in
 * open a phoenix log `log stream --process Phoenix`
 * uncomment the following keyboard shortcut to trigger a log of open application names
 */
export default findAppNames = () => {
  Key.on("a", ["alt", "shift"], () => {
    const array = App.all()
      .map((a) => a.name())
      .sort();
    let chunk = 10;
    Phoenix.log();
    Phoenix.log("************ APPLICATIONS START *************");
    for (let i = 0, j = array.length; i < j; i += chunk) {
      let temp = array.slice(i, i + chunk);
      Phoenix.log(temp);
    }
    Phoenix.log("************ APPLICATIONS END *************");
    Phoenix.log();
  });
};
