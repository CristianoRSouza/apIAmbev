export default class Utils {
  static validateZipCode(zip_code: string): boolean {
    const zipCode = zip_code?.replace(/\D/g, '');

    if (!zipCode || zipCode.length !== 8) {
      return false;
    }

    if (/^\d{2}\.\d{3}-\d{3}$/.test(zipCode)) {
      return false;
    }

    return true;
  }

  static PostToken(token: string) {
    localStorage.setItem('tokenJWT', token);
  }

  static GetToken() {
    return localStorage.getItem('tokenJWT');
  }

  static Sort(event: { active: string; direction: string }, _order: string) {
    const { active, direction } = event;
    const orderArray = _order.split(', ').map((order) => order.trim());
    const existingIndex = orderArray.findIndex((order) =>
      order.startsWith(active)
    );

    if (existingIndex !== -1) {
      if (direction) {
        orderArray[existingIndex] = `${active} ${direction}`;
      } else {
        orderArray.splice(existingIndex, 1);
      }
    } else if (direction) {
      orderArray.push(`${active} ${direction}`);
    }

    return orderArray.join(', ');
  }
}
