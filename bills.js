class BillsAddExportButtons {
  constructor() {
    this.utils = new Utils();
    const targetElement = document.querySelector('.bills-browser');
    const config = { attributes: true, childList: true, subtree: true }
    const observer = new MutationObserver(this.insertExportButtonCallback.bind(this));
    observer.observe(targetElement, config)
  }

  getChargesList() {
    const that = this;
    const charges = [];

    document.querySelectorAll('.charge:not([style=\'display:none\'])').forEach(function(charge){
      const date = that.utils.normalizeDate(charge.querySelector('.time').textContent);
      const description = charge.querySelector('.description').textContent.trim();
      const amount = that.utils.normalizeAmount(charge.querySelector('.amount').textContent);

      charges.push({ date, description, amount });
    });

    return charges;
  }

  generate(exportType) {
    let generator;
    const data = this.getChargesList();

    switch (exportType) {
      case 'ofx':
          generator =   new OfxGenerator(data);
          this.exportMimeType = 'application/x-ofx';
          break;
      case 'csv':
      default:
        generator = new CsvGenerator(data);
        this.exportMimeType = 'application/vnd.ms-excel';
    }

    this.exportFile(generator.generate(), exportType, this.exportMimeType);
  }

  exportFile(content, extension, mimetype) {
    const openMonth = " " + document.querySelector('md-tab.ng-scope.active .period').textContent.trim();
    const period = this.utils.normalizeYear(openMonth) + "-" + this.utils.normalizeMonth(openMonth);

    const link = document.createElement("a");
    link.setAttribute("href", `data:${mimetype},${encodeURIComponent(content)}`);
    link.setAttribute("download", `nubank-${period}.${extension}`);
    link.click();
  }

  createExportButton(text, exportType, callback) {
    const that = this;
    const button = document.createElement('button');

    button.classList.add('nu-button');
    button.classList.add('secondary');
    button.setAttribute('role', 'nutils-export-button');
    button.setAttribute('data-export-type', exportType);
    button.textContent = text;

    button.addEventListener('click', (el) => {
      callback.apply(that, [el.target.dataset.exportType]);
    })

    return button;
  }

  exportButtonsExists() {
    return document.querySelectorAll(".summary.open [role=\"nutils-export-button\"]").length > 0
  }

  insertExportButtonCallback(mutationList, observer) {
    if (mutationList == undefined || this.exportButtonsExists()) return;

    const generateBoletoButton = document.querySelector('.summary.open .nu-button');
    if (generateBoletoButton == undefined) return;

    generateBoletoButton.parentNode.appendChild(this.createExportButton('Exportar para OFX', 'ofx', this.generate));
    generateBoletoButton.parentNode.appendChild(this.createExportButton('Exportar para CSV', 'csv', this.generate));

    observer.disconnect();
  }
}

new BillsAddExportButtons();