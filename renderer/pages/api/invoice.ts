import axios from "axios";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";
import PDfprinter from 'pdfmake'
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { getBase64ImageFromURL } from "../../utils/getBase64ImageFromURL";
// import { any } from "~/types";
// import { getBase64ImageFromURL } from "~/utils/getBase64ImageFromURL";
// import { getColorInvoiceStatus, getNameInvoiceStatus, isInvoiceStatus } from "~/utils/invoiceStatus";
// import { convert } from 'html-to-text';

export type InvoiceDataItem = {
    price: number,
    quantity: number,
    total: number,
    items__description: string
}

export type InvoiceData = {
    service_buyer: {
        name: string,
        nif: string,
        state: string,
        city: string,
        country_name: string
        street: string,
        number: string,
        cep: string,
        district: string,
    },
    service_provider: {
        name: string,
        nif: string,
        state: string,
        city: string,
        country_name: string,
        street: string,
        number: string,
        cep: string,
        district: string,
    },
    service_provider_name: string,
    service_buyer_name: string,
    amount: number,
    responsible_email: string,
    terms_payment: string,
    company_number: string,
    observation: string,
    due_date: string,
    currency: string,
    number: number,
    logo: string,
    status_payment: string,
    payment_date: null,
    hash_payments: string,
    contract_uuid: string,
    contract_number: string,
    created_at: string,
    ship_to: {
        name: string,
        nif: string,
        state: string,
        street: string,
        number: string,
        complement: string,
        cep: string,
        district: string,
        city: string,
        country_name: string,
    },
    due_date_contract: string,
    items: Array<InvoiceDataItem>
}

const InvoicePDF = async (req: NextApiRequest, res: NextApiResponse) => {
    const {amount, quantity} = req.query
    const formatValue = (invoice: InvoiceData, value: number) => {
        console.log(invoice.currency)
        return Intl.NumberFormat("pt-BR", { style: "currency", currency: invoice.currency }).format(value)
    }

    const generatedInvoice = async (invoice: InvoiceData) => {
        const fonts = {
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica'
            }
        }

        try {
            const printer = new PDfprinter(fonts)
            const newImage = await getBase64ImageFromURL(`https://arx.hk/wp-content/uploads/2021/10/Logo-2.png`)
            // const kombinationsLogo = await getBase64ImageFromURL(`${process.env.NEXT_PUBLIC_KOMBINATIONS_LOGO_PNG}`)
            const totalAmount = invoice.items.reduce((previousValue, currentValue) => previousValue + currentValue.total, 0);
            const totalAmountFormatt = formatValue(invoice, Number(amount) * Number(quantity));
            console.log(totalAmountFormatt)
            const body = invoice.items.map((item, index) => {
                return (
                    [
                        {
                            text: index + 1,
                            border: [false, false, false, true],
                            margin: [0, 5, 0, 5],
                            alignment: 'left',
                        },
                        {
                            text: 'INDUSTRIAL GRADE 1,2-BENZIOSATHIAZOLIN-3-ONE , 85% 500 KG BAG',
                            border: [false, false, false, true],
                            margin: [0, 5, 0, 5],
                            alignment: 'left',
                        },
                        {
                            text: quantity,
                            border: [false, false, false, true],
                            margin: [0, 5, 0, 5],
                            alignment: 'center',
                        },
                        {
                            border: [false, false, false, true],
                            text: formatValue(invoice, Number(amount) * Number(quantity)),
                            fillColor: '#f5f5f5',
                            alignment: 'right',
                            margin: [0, 5, 0, 5],
                        }]
                )
            })
            const docDefinitions: TDocumentDefinitions = {
                defaultStyle: { font: 'Helvetica' },
                footer: {
                    columns: [

                        [
                            {
                                text: "ARX LIMITED - RM 1002, 10/F, Golden Gate Commercial Building, 138 Austin Road, Tsim Sha Tsui, Hong Kong, S.A.R, 999077 ",
                                fontSize: 8,
                                alignment: 'center',
                                margin: [0, 0, 0, 5]
                            },
                            {
                                text: 'www.arx.hk',
                                fontSize: 8,
                                width: 100,
                                alignment: 'center'
                            },
                        ],

                    ]
                },
                content: [
                    // {
                    //     text: 'Invoice',
                    //     style: 'title'
                    // }, 
                    {
                        columns: [
                            [
                                {
                                    //Invoice top informations
                                    stack: [
                                        {
                                            columns: [
                                                {
                                                    text: 'Invoice Nº',
                                                    style: 'invoiceInformationsTitle',
                                                    width: '*',
                                                },
                                                {
                                                    text: String(invoice.company_number),
                                                    style: 'invoiceInformations',
                                                    width: 100,
                                                },
                                            ],
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: 'Invoice Date',
                                                    style: 'invoiceInformationsTitle',
                                                    width: '*',
                                                },
                                                {
                                                    text: moment(invoice.due_date).format("DD/MM/YYYY"),
                                                    style: 'invoiceInformations',
                                                    width: 100,
                                                },
                                            ],
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: 'Due Date',
                                                    style: 'invoiceInformationsTitle',
                                                    width: '*',
                                                },
                                                {
                                                    text: moment(invoice.due_date).format("DD/MM/YYYY"),
                                                    style: 'invoiceInformations',
                                                    width: 100,
                                                },
                                            ],
                                        },
                                        {
                                            columns: [
                                                {
                                                    text: 'Amount',
                                                    style: 'invoiceInformationsTitle',
                                                    width: '*',
                                                },
                                                {
                                                    text: formatValue(invoice, invoice.amount),
                                                    style: 'invoiceInformations',
                                                    width: 100,
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                            {
                                text: 'COMMERCIAL INVOICE',
                                style: 'title'
                            },
                            {
                                image: newImage,
                                width: 150,
                            }
                        ]
                    },
                    {
                        columns: [
                            {
                                text: 'SOLD-TO',
                                color: '#aaaaab',
                                bold: true,
                                fontSize: 14,
                                alignment: 'left',
                                margin: [0, 20, 0, 5],
                            },
                            {
                                text: 'ORDERED BY',
                                color: '#aaaaab',
                                bold: true,
                                fontSize: 14,
                                alignment: 'left',
                                margin: [0, 20, 0, 5],
                            },
                            {
                                text: 'BILLED BY',
                                color: '#aaaaab',
                                bold: true,
                                fontSize: 14,
                                alignment: 'left',
                                margin: [0, 20, 0, 5],
                            },
                        ],
                    },
                    {
                        columns: [
                            {
                                text: 'BBBBBBBBBB',
                                bold: true,
                                color: '#333333',
                                alignment: 'left',
                            },
                            {
                                text: invoice.service_buyer_name,
                                bold: true,
                                color: '#333333',
                                alignment: 'left',
                            },
                            {
                                text: invoice.ship_to.name,
                                bold: true,
                                color: '#333333',
                                alignment: 'left',
                            },
                        ],
                    },
                    {
                        columns: [
                            {
                                text: `${invoice.service_provider.street}, ${invoice.service_provider.number} - ${invoice.service_provider.district} ${invoice.service_provider.state}/${invoice.service_provider.city}`,
                                //text: '9999 Street name 1A \n New-York City NY 00000 \n   USA',
                                style: 'invoiceBillingAddress',
                                margin: [0,5,0,0]
                            },
                            {
                                text: `${invoice.service_buyer.street}, ${invoice.service_buyer.number} - ${invoice.service_buyer.district} ${invoice.service_buyer.state}/${invoice.service_buyer.city}`,
                                //text: '1111 Other street 25 \n New-York City NY 00000 \n   USA',
                                style: 'invoiceBillingAddress',
                                margin: [0,5,0,0]
                            },
                            {
                                text: `${invoice.ship_to.street}, ${invoice.ship_to.number} - ${invoice.ship_to.district} ${invoice.ship_to.state}/${invoice.ship_to.city}`,
                                //text: '1111 Other street 25 \n New-York City NY 00000 \n   USA',
                                style: 'invoiceBillingAddress',
                                margin: [0,5,0,0]
                            },
                        ],
                    },
                    '\n\n',
                    {
                        layout: {
                            defaultBorder: false,
                            hLineWidth: function (/*i, node*/) {
                                return 1;
                            },
                            vLineWidth: function (/*i, node*/) {
                                return 1;
                            },
                            hLineColor: function (i/*, node*/) {
                                if (i === 1 || i === 0) {
                                    return '#bfdde8';
                                }
                                return '#eaeaea';
                            },
                            vLineColor: function (/*i, node*/) {
                                return '#eaeaea';
                            },
                            hLineStyle: function (/*i, node*/) {
                                // if (i === 0 || i === node.table.body.length) {
                                return null;
                                //}
                            },
                            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                            paddingLeft: function (/*i, node*/) {
                                return 10;
                            },
                            paddingRight: function (/*i, node*/) {
                                return 10;
                            },
                            paddingTop: function (/*i, node*/) {
                                return 2;
                            },
                            paddingBottom: function (/*i, node*/) {
                                return 2;
                            },
                            fillColor: function (/*rowIndex, node, columnIndex*/) {
                                return '#fff';
                            },
                        },
                        table: {
                            headerRows: 1,
                            widths: [20, '*', 50, 80],
                            body: [
                                //Table header
                                [
                                    {
                                        text: 'Nº',
                                        fillColor: '#eaf2f5',
                                        border: [false, true, false, true],
                                        margin: [0, 5, 0, 5],
                                        textTransform: 'uppercase',
                                    },
                                    {
                                        text: 'Item description',
                                        fillColor: '#eaf2f5',
                                        border: [false, true, false, true],
                                        margin: [0, 5, 0, 5],
                                        textTransform: 'uppercase',
                                    },
                                    {
                                        text: 'Quantity',
                                        fillColor: '#eaf2f5',
                                        border: [false, true, false, true],
                                        margin: [0, 5, 0, 5],
                                        alignment: 'center',
                                        textTransform: 'uppercase',
                                    },
                                    {
                                        text: 'Amount',
                                        border: [false, true, false, true],
                                        alignment: 'right',
                                        fillColor: '#eaf2f5',
                                        margin: [0, 5, 0, 5],
                                        textTransform: 'uppercase',
                                    },
                                ],
                                //table Body
                                ...body,
                            ],
                        },
                    },
                    '\n\n',
                    {
                        layout: {
                            defaultBorder: false,
                            hLineWidth: function (/*i, node*/) {
                                return 1;
                            },
                            vLineWidth: function (/*i, node*/) {
                                return 1;
                            },
                            hLineColor: function (/*i, node*/) {
                                return '#eaeaea';
                            },
                            vLineColor: function (/*i, node*/) {
                                return '#eaeaea';
                            },
                            hLineStyle: function (/*i, node*/) {
                                // if (i === 0 || i === node.table.body.length) {
                                return null;
                                //}
                            },
                            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                            paddingLeft: function (/*i, node*/) {
                                return 10;
                            },
                            paddingRight: function (/*i, node*/) {
                                return 10;
                            },
                            paddingTop: function (/*i, node*/) {
                                return 3;
                            },
                            paddingBottom: function (/*i, node*/) {
                                return 3;
                            },
                            fillColor: function (/*rowIndex, node, columnIndex*/) {
                                return '#fff';
                            },
                        },
                        //Subtotal Table itens
                        table: {
                            headerRows: 0,
                            widths: ['*', 'auto'],
                            body: [
                                [
                                    {
                                        text: 'Total',
                                        bold: true,
                                        fontSize: 16,
                                        alignment: 'right',
                                        border: [false, false, false, true],
                                        margin: [0, 5, 0, 5],
                                    },
                                    {
                                        text: totalAmountFormatt,
                                        bold: true,
                                        fontSize: 14,
                                        alignment: 'right',
                                        border: [false, false, false, true],
                                        fillColor: '#f5f5f5',
                                        margin: [0, 5, 0, 5],
                                    },
                                ],
                            ],
                        },
                    },
                    {
                        columns: [
                            {
                                text: 'Seller company',
                                style: 'notesTitle',
                            },
                            {
                                text: 'Buyer company',
                                style: 'notesTitle',
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                text: invoice.ship_to.name,
                                style: 'notesTitle',
                            },
                            {
                                text: invoice.service_buyer_name,
                                style: 'notesTitle',
                            },
                        ]
                    },
                    // invoice.hash_payments && '\n\n',
                    // invoice.hash_payments && ({
                    //     text: 'Link to Pay online',
                    //     link: 'invoice',
                    //     style: 'linkText'
                    // }),
                    // '\n',
                    // {
                    //     text: 'TERMS OF PAYMENT',
                    //     style: 'notesTitle',
                    // },
                    // {
                    //     text: invoice.terms_payment,
                    //     style: 'notesText',
                    // },
                    // '\n\n',
                    // {
                    //     text: 'NOTES',
                    //     style: 'notesTitle',
                    // },
                    // {
                    //     text: invoice.observation,
                    //     style: 'notesText',
                    // },
                ],
                styles: {
                    title: {
                        color: '#333333',
                        fontSize: 14,
                        bold: true,
                        alignment: 'center',
                        margin: [0, 0, 0, 15],
                    },
                    invoiceInformationsTitle: {
                        color: '#aaaaab',
                        bold: true,
                        fontSize: 12,
                        alignment: 'left',
                    },
                    invoiceInformations: {
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        alignment: 'left',
                    },
                    notesTitle: {
                        fontSize: 10,
                        margin: [0, 30, 0, 3],
                        alignment: 'center',
                    },
                    notesText: {
                        fontSize: 10,
                    },
                    linkText: {
                        fontSize: 10,
                        color: 'blue',
                        decoration: 'underline',
                    }
                },
            }
            const pdfDoc = printer.createPdfKitDocument(docDefinitions)

            const chunks: any = []

            pdfDoc.on("data", chunk => {
                chunks.push(chunk);
            })

            pdfDoc.end()

            pdfDoc.on("end", () => {
                let result: ArrayBuffer;
                result = Buffer.concat(chunks);
                // return res.end(result);

                //Caso queira fazer o download usar o código abaixo
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'form-data; name="arquivo.pdf";     filename="arquivo.pdf"');
                res.status(200).send(result)
            })
        } catch (error: any) {
            console.log(error)
            res.redirect(307, '/login');
        }
    }

    const getInvoice = async () => {
        try {
            const { data } = await axios.get<any>('https://homo.kombinations.vip/api/v2/invoice-data/?schema=jbl&uuid_invoice=ac0b66ef-4313-45e8-8419-3e2901a308bf');
            console.log('invoice', data)
            await generatedInvoice(data);
        } catch (error: any) {
            console.log(error)
            res.redirect(307, '/login');
        }
    }
    await getInvoice();
}

export default InvoicePDF;