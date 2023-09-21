import TicketsDao from '../dao/dbManagers/tickets.js'
export default class TicketRepository {
  constructor() {
    this.dao = new TicketsDao();
  }

  saveTicket = async (ticket) => {
    return await this.dao.save(ticket);
  }

  findTicketByID = async (id) => {
    return await this.dao.findById(id);
  }
  listofProducts = async (productstoBuy, amount) => {
    let html = '<table><tr><th>Title  </th><th>  Price  </th><th>  Quantity  </th></tr>';

    productstoBuy.forEach((product) => {
      html += `<tr><td>${product.title}</td><td>${product.price}</td><td>${product.quantity}</td></tr>`;
    });

    html += `<tr><td>Total:$${amount}</td></tr></table>`;
    return html;
  }

}