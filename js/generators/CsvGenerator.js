class CsvGenerator {
  constructor(data) {
    this.data = data
  }

  csvHeader() {
    return `date,description,amount\n`;
  }

  csvItem(date, description, amount) {
    return `${date},${description},${amount}\n`;
  }

  generate() {
    const that = this;
    let content = this.csvHeader();

    this.data.map((item) => {
      content += that.csvItem(item.date, item.description, item.amount);
    })

    return content
  }
}