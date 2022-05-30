class OfxGenerator {
  constructor(data) {
    this.data = data
  }

  ofxStart() {
    return `
OFXHEADER:100
DATA:OFXSGML
VERSION:102
SECURITY:NONE
ENCODING:USASCII
CHARSET:1252
COMPRESSION:NONE
OLDFILEUID:NONE
NEWFILEUID:NONE

<OFX>
<BANKMSGSRSV1>
<STMTTRNRS>
<STMTRS>
<BANKTRANLIST>
`;
  }

  ofxEnd(){
    return `</BANKTRANLIST>
</STMTRS>
</STMTTRNRS>
</BANKMSGSRSV1>
</OFX>
`;
  }

  ofxItemBankStatement(date, amount, description) {
    return `<STMTTRN>
<TRNTYPE>OTHER</TRNTYPE>
<DTPOSTED>${date}</DTPOSTED>
<TRNAMT>${amount}</TRNAMT>
<MEMO>${description}</MEMO>
</STMTTRN>`;
  }

  generate() {
    const that = this;
    let content = this.ofxStart();

    this.data.map((item) => {
      content += that.ofxItemBankStatement(item.date, item.amount, item.description);
    })

    content += this.ofxEnd();

    return content
  }
}