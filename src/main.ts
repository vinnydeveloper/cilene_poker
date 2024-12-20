import Player from "./entities/Player";
import Table from "./entities/Table";

const vinny = new Player("Vinny");
const brunno = new Player("Brunno");

const table = new Table();

table.addPlayer(vinny);
table.addPlayer(brunno);

window.table = table;
