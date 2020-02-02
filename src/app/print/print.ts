import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { commands } from './printer-commands';

@Injectable()
export class PrintProvider {

    constructor(private btSerial: BluetoothSerial, private alertCtrl: AlertController) {

    }

    searchBt() {
        return this.btSerial.list();
    }

    connectBT(address) {
        return this.btSerial.connect(address);

    }

    print2(address, printData, buffer) {

        let receipt = '';
        receipt += commands.HARDWARE.HW_INIT;
        receipt += commands.TEXT_FORMAT.TXT_4SQUARE;
        //receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
        //receipt += title.toUpperCase();
        receipt += commands.EOL;
        receipt += commands.TEXT_FORMAT.TXT_NORMAL;
        receipt += commands.HORIZONTAL_LINE.HR_58MM;
        receipt += commands.EOL;
        receipt += commands.HORIZONTAL_LINE.HR2_58MM;
        receipt += commands.EOL;
        receipt += commands.TEXT_FORMAT.TXT_ALIGN_LT;
        receipt += printData;
        //secure space on footer
        receipt += commands.EOL;
        receipt += commands.EOL;
        receipt += commands.EOL;


        this.btSerial.isEnabled().then(async valor => {
            let xyz = this.connectBT(address).subscribe(data => {
                this.btSerial.write(buffer).then(async dataz => {
                    let mno = await this.alertCtrl.create({

                        header: "Impressão OK!",
                        buttons: ['OK']
                    });
                    await mno.present();

                    xyz.unsubscribe();
                }, async errx => {
                    let mno = await this.alertCtrl.create({
                        header: "Falha na impressão " + errx,
                        buttons: ['OK']
                    });
                    await mno.present();
                });
            }, async err => {
                let mno = await this.alertCtrl.create({
                    //header: "ERROR " + err,
                    header: "ERROR! Verifique a impressora configurada. " + err,
                    buttons: ['OK']
                });
                await mno.present();
            });

        }, async errx => {
            let mno = await this.alertCtrl.create({

                header: "Ligue o seu Bluetooth",
                buttons: ['OK']
            });
            await mno.present();
        });

    }


    print(address, printData, buffer) {

        let receipt = '';
        receipt += commands.HARDWARE.HW_INIT;
        receipt += commands.TEXT_FORMAT.TXT_4SQUARE;
        //receipt += commands.TEXT_FORMAT.TXT_ALIGN_CT;
        //receipt += title.toUpperCase();
        receipt += commands.EOL;
        receipt += commands.TEXT_FORMAT.TXT_NORMAL;
        receipt += commands.HORIZONTAL_LINE.HR_58MM;
        receipt += commands.EOL;
        receipt += commands.HORIZONTAL_LINE.HR2_58MM;
        receipt += commands.EOL;
        receipt += commands.TEXT_FORMAT.TXT_ALIGN_LT;
        receipt += printData;
        //secure space on footer
        receipt += commands.EOL;
        receipt += commands.EOL;
        receipt += commands.EOL;


        this.btSerial.isEnabled().then(async valor => {
            let xyz = this.connectBT(address).subscribe(data => {
                this.btSerial.write(this.noSpecialChars(receipt)).then(async dataz => {
                    let mno = await this.alertCtrl.create({

                        header: "Impressão OK!",
                        buttons: ['OK']
                    });
                    await mno.present();

                    xyz.unsubscribe();
                }, async errx => {
                    let mno = await this.alertCtrl.create({
                        header: "Falha na impressão " + errx,
                        buttons: ['OK']
                    });
                    await mno.present();
                });
            }, async err => {
                let mno = await this.alertCtrl.create({
                    //header: "ERROR " + err,
                    header: "ERROR! Verifique a impressora configurada. " + err,
                    buttons: ['OK']
                });
                await mno.present();
            });

        }, async errx => {
            let mno = await this.alertCtrl.create({

                header: "Ligue o seu Bluetooth",
                buttons: ['OK']
            });
            await mno.present();
        });

    }


    private noSpecialChars(string) {
        var translate = {
            à: 'a',
            á: 'a',
            â: 'a',
            ã: 'a',
            ä: 'a',
            å: 'a',
            æ: 'a',
            ç: 'c',
            è: 'e',
            é: 'e',
            ê: 'e',
            ë: 'e',
            ì: 'i',
            í: 'i',
            î: 'i',
            ï: 'i',
            ð: 'd',
            ñ: 'n',
            ò: 'o',
            ó: 'o',
            ô: 'o',
            õ: 'o',
            ö: 'o',
            ø: 'o',
            ù: 'u',
            ú: 'u',
            û: 'u',
            ü: 'u',
            ý: 'y',
            þ: 'b',
            ÿ: 'y',
            ŕ: 'r',
            À: 'A',
            Á: 'A',
            Â: 'A',
            Ã: 'A',
            Ä: 'A',
            Å: 'A',
            Æ: 'A',
            Ç: 'C',
            È: 'E',
            É: 'E',
            Ê: 'E',
            Ë: 'E',
            Ì: 'I',
            Í: 'I',
            Î: 'I',
            Ï: 'I',
            Ð: 'D',
            Ñ: 'N',
            Ò: 'O',
            Ó: 'O',
            Ô: 'O',
            Õ: 'O',
            Ö: 'O',
            Ø: 'O',
            Ù: 'U',
            Ú: 'U',
            Û: 'U',
            Ü: 'U',
            Ý: 'Y',
            Þ: 'B',
            Ÿ: 'Y',
            Ŕ: 'R',
        },
            translate_re = /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŕŕÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÝÝÞŸŔŔ]/gim;
        return string.replace(translate_re, function (match) {
            return translate[match];
        });
    }

}