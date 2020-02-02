import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
 
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { PrintProvider } from '../print/print';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  pdfObj = null;
  createdCode = '123';

  letterObj = {
    to: '',
    from: '',
    text: ''
  }

  constructor(
    public navCtrl: NavController, 
    private plt: Platform, 
    private file: File, 
    private fileOpener: FileOpener,
    private printProvider: PrintProvider,
    private bluetoothSerial: BluetoothSerial,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.gerarPDF();
  }


  

  gerarPDF(){
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const imageData = canvas.toDataURL("image/jpeg").toString();
    

    let base64exemplo = imageData;
    var docDefinition = {
      content: [
      {
      columns: [
      {
      image: base64exemplo,
      fit: [200,200],

      },
      [
      { text: 'BITCOIN', style: 'header',  },
      { text: 'Cryptocurrency Payment System', style: 'sub_header' },
      { text: 'WEBSITE: https://bitcoin.org/', style: 'url' },
      ]
      ]
      }
      ],
      styles: {
      image: {
        
      },  
      header: {
      bold: true,
      fontSize: 60,
      alignment: 'right'
      },
      sub_header: {
      fontSize: 40,
      alignment: 'right'
      },
      url: {
      fontSize: 30,
      alignment: 'right'
      }
      }
     
      };
      
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }

  testarImpressao02(){
    this.pdfObj.getBuffer((buffer) => {
      this.enviaBluetoothSerial(buffer);

      let blob = new Blob([buffer], { type: 'application/pdf' });
      this.file.writeFile(this.file.externalApplicationStorageDirectory, 'Orcamento.pdf', blob, { replace: true }).then(fileEntry => {
        this.fileOpener.open(this.file.externalApplicationStorageDirectory + 'Orcamento.pdf', 'application/pdf');
      })
    });
  }

  enviaBluetoothSerial(buffer){
    this.printProvider.print2("0F:02:17:70:87:89", "texto", buffer);
    //this.bluetoothSerial.write(buffer).then(() => console.log("Funcionou!"), (error) => console.log(error));
  }


  imprimir(){
    this.printProvider.print("0F:02:17:70:87:89", "texto teste", null);
  }

  createPdf() {
    var docDefinition = {
      content: [
        { text: 'REMINDER', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },
 
        { text: 'From', style: 'subheader' },
        { text: this.letterObj.from },
 
        { text: 'To', style: 'subheader' },
        this.letterObj.to,
 
        { text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20] },
 
        {
          ul: [
            'Bacon',
            'Rips',
            'BBQ',
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
  }
 
  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        //this.enviaBluetoothSerial(buffer);
        console.log("teste....: "+buffer);

        //var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        //this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          //this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        //})
      });
    } else {
      


      this.pdfObj.download();
    }
  }
 
}
