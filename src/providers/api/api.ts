// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  private uri: string   = 'http://kontrolcerdas.com/ztiram/';
  private host: string  = this.uri.replace(/http\:\/\/|https\:\/\/|\/ztiram\//g, '');
  private apitoken: string;

  public test: any  = this.host;
  private globalheader: any = {};

  constructor(private http: HTTP, private sql: Storage) {
    // console.log('Hello ApiProvider Provider');
    this.getApiToken();

  }

  protected getApiToken() {

    this.sql.ready().then(() => {

      this.sql.get('tokenAPIuser').then((val) => {

        if (val) {

          this.apitoken = val;

        }

      });

    });

  }

  public cekKumbungDbUser(user: string) {

    // data user di DB
    this.sql.get('userData').then(text => {

      if (text) {

        // this.sql.set('userData', text);
        console.log('user tersedia');

      } else {

        this.sql.set('userData', user);

      }

    });

    // foto Profile Sementara ini offline
    this.sql.get('photoProfile').then(text => {

      if (text) {

        // this.sql.set('photoProfile', 'assets/imgs/user_default.jpg');
        console.log('Foto Profile Tersedia');

      } else {

        this.sql.set('photoProfile', 'assets/imgs/user_default.jpg');

      }

    });

    // cari status
    this.sql.get('statusProfile').then(text => {

      if (text) {

        // this.sql.set('statusProfile', 'Semangat Malam!');
        console.log('status tersedia');

      } else {

        this.sql.set('statusProfile', 'Semangat Malam!');

      }

    });

  }

  /**
   * API Login
   * @param $data Email, dan Password
   */
  public login($data: object) {
    // email , password
    // { "token": "188 char" }
    let res: any;

    this.http.setDataSerializer("json");
    this.http.setHeader(this.host, "Accept", "application/json");
    this.http.setHeader(this.host, "Content-Type", "application/json");

    res = this.http.post(this.uri + 'api/login', $data, this.globalheader);

    if (res) {

      return res;

    } else {

      return false;

    }

  }

  /**
   * API Register
   * @param $data name, email, password, c_password
   */
  public register($data: object) {
    // Parameter Wajib : name, email, password, c_password
    // { "msg": "successfully register ", "api_token": "A3jSmjCFhzzX51o5ZFnLejf" }
    let res: any;
    this.http.setDataSerializer("json");
    this.http.setHeader(this.host, "Accept", "application/json");
    this.http.setHeader(this.host, "Content-Type", "application/json");

    res = this.http.post(this.uri + 'api/user/register', $data, this.globalheader);

    if (res) {

      return res;

    } else {

      return false;

    }

  }

  /**
   * API get data User Profile
   * @param null
   * @abstract  user Token
   */
  public userProfile(token: string = this.apitoken) {

    // {
    //   "id": 3,
    //   "name": "Khalid Abdurrahman",
    //   "email": "tubeyousc@gmail.com",
    //   "usertype": "user",
    //   "accountstatus": "aktif",
    //   "last_login": null
    // }
    let res: any;

    this.http.setDataSerializer("json");
    this.http.setHeader(this.host, "Accept", "application/json");
    this.http.setHeader(this.host, "Content-Type", "application/json");
    this.http.setHeader(this.host, 'Authorization', 'Bearer ' + token)

    if (token) {

      res = this.http.get(this.uri + 'api/user', {}, this.globalheader);
      return res;

    } else {

      return false;

    }

  }

  public putPassword(curent: string, baru: string, token: any = this.apitoken) {

    let res: any;

    this.http.setDataSerializer("json");
    this.http.setHeader(this.host, "Accept", "application/json");
    this.http.setHeader(this.host, "Content-Type", "application/json");
    this.http.setHeader(this.host, "Authorization", "Bearer " + token)

    if (token) {

      res = this.http.post(this.uri + 'api/user/updatepassword', { "current-password" : String(curent), "new-password" : String(baru) }, this.globalheader);
      return res;

    } else {

      return false;

    }

  }

  /**
   * API get All IoT Devices
   * @param null
   */
  public iotDevices(token: string = this.apitoken) {

    // [
    //   {
    //     "id": 3,
    //     "user_id": 2,
    //     "SN": "10210991",
    //     "token": "Jhuq81kjis",
    //     "description": "SASaksj",
    //     "qr_code": null,
    //     "registered_android": "1",
    //     "type_id": 2,
    //     "created_at": "2018-08-23 06:17:37",
    //     "updated_at": "2018-08-25 20:16:56",
    //     "deleted_at": null,
    //     "available": "no"
    //   }
    // ]

    let res: any;

    this.http.setDataSerializer("json");
    this.http.setHeader(this.host, "Accept", "application/json");
    this.http.setHeader(this.host, "Content-Type", "application/json");
    this.http.setHeader(this.host, 'Authorization', 'Bearer ' + token)

    if (token) {

      res = this.http.get(this.uri + 'api/my/iotdevice', {}, this.globalheader);
      return res;

    } else {

      return false;

    }

  }

  public iotDevicesByProject(id: any, token: string = this.apitoken) {


      let res: any;

      this.http.setDataSerializer("json");
      this.http.setHeader(this.host, "Accept", "application/json");
      this.http.setHeader(this.host, "Content-Type", "application/json");
      this.http.setHeader(this.host, 'Authorization', 'Bearer ' + token)

      if (token) {

        res = this.http.get(this.uri + 'api/project/iotdevices/' + id, {}, this.globalheader);
        return res;

      } else {

        return false;

      }

    }

  /**
   * Tambah IoT Berdasarkan Token IoT
   * @param token string 188 char
   */
  public addIoTDevice(tiot: string, token: string = this.apitoken) {

    // token
    // { "msg": “Success ! Device added”}
    let res: any;

    this.http.setDataSerializer("json");
    this.http.setHeader(this.host, "Accept", "application/json");
    this.http.setHeader(this.host, "Content-Type", "application/json");
    this.http.setHeader(this.host, "Authorization", "Bearer " + token)

    if (token) {

      res = this.http.post(this.uri + 'api/submit_qr', { "token" : tiot }, this.globalheader);
      return res;

    } else {

      return false;

    }

  }

  public setIoTDeviceToProject(id: any, iot: any, token: string = this.apitoken) {

    // token
    // { "msg": “Success ! Device added”}
    let res: any;

    this.http.setDataSerializer("json");
    this.http.setHeader(this.host, "Accept", "application/json");
    this.http.setHeader(this.host, "Content-Type", "application/json");
    this.http.setHeader(this.host, "Authorization", "Bearer " + token)

    if (token) {

      res = this.http.post(this.uri + 'api/projecthasiotdevices', { "project_id" : id, "iot_device_id" : iot }, this.globalheader);
      return res;

    } else {

      return false;

    }

  }

  public getLastRecord(iot: any, param: any, token: string = this.apitoken) {

    // {
    //     "id": 31764,
    //     "parameter_id": 1,
    //     "value": "22",
    //     "created_at": "2018-08-26 22:30:02",
    //     "updated_at": "2018-08-26 22:30:02",
    //     "deleted_at": null,
    //     "iot_device_id": 3
    // }

    let res: any;

    this.http.setDataSerializer("json");
    this.http.setRequestTimeout(10.0);
    this.http.setHeader(this.host, "Accept", "application/json");
    this.http.setHeader(this.host, "Content-Type", "application/json");
    this.http.setHeader(this.host, 'Authorization', 'Bearer ' + token)

    if (token) {

      res = this.http.get(this.uri + 'api/gauge/' + iot + '/' + param, {}, this.globalheader);
      return res;

    } else {

      return false;

    }

  }

  /**
   * Cari Parameter Per IoT
   * @param id Number
   */
  public getParamPerIoT(id: any, token: string = this.apitoken) {

    // [
    //   {
    //       "parameter_id": 1,
    //       "parameter": "Suhu",
    //       "range_min": 20,
    //       "range_max": 28,
    //       "range_full": 60,
    //       "unit": "℃",
    //       "icon": "fa-thermometer-half"
    //   },
    //   {
    //       "parameter_id": 2,
    //       "parameter": "Kelembaban",
    //       "range_min": 60,
    //       "range_max": 90,
    //       "range_full": 100,
    //       "unit": "%",
    //       "icon": "fa-tint"
    //   },
    //   {
    //       "parameter_id": 4,
    //       "parameter": "Pompa Air",
    //       "range_min": 0,
    //       "range_max": 1,
    //       "range_full": 1,
    //       "unit": "",
    //       "icon": "fa-shower"
    //   }
    // ]
    let res: any;

    this.http.setDataSerializer("json");
    this.http.setHeader(this.host, "Accept", "application/json");
    this.http.setHeader(this.host, "Content-Type", "application/json");
    this.http.setHeader(this.host, 'Authorization', 'Bearer ' + token)

    if (token) {

      res = this.http.get(this.uri + 'api/parameters/iot/' + id, {}, this.globalheader);
      return res;

    } else {

      return false;

    }

  }

  putMinMaxParamPerIot(iot: any, param: any, min: any, max: any, token: string = this.apitoken) {

    let res: any;

    this.http.setDataSerializer("json");
    this.http.setHeader(this.host, "Accept", "application/json");
    this.http.setHeader(this.host, "Content-Type", "application/json");
    this.http.setHeader(this.host, "Authorization", "Bearer " + token)

    if (token) {

      res = this.http.get(this.uri + 'api/update_rasio/'+ iot +'/'+ param +'/'+ min +'/'+ max, {}, this.globalheader);
      return res;

    } else {

      return false;

    }

  }

  /**
   * API get All Project
   * @param null
   */
  public getRumahJamur(token: string = this.apitoken) {
    // [
    //   {
    //     "id": 1,
    //     "user_id": 2,
    //     "name": "Project1",
    //     "amount_landfields": 1,
    //     "amount_buglog": 2,
    //     "address": "Cikarang Barat, Bekasi",
    //     "created_at": "2018-06-01 06:29:10",
    //     "updated_at": "2018-06-01 06:29:10",
    //     "deleted_at": null
    //   }
    // ]
    let res: any;

    this.http.setDataSerializer("json");
    this.http.setHeader(this.host, "Accept", "application/json");
    this.http.setHeader(this.host, "Content-Type", "application/json");
    this.http.setHeader(this.host, 'Authorization', 'Bearer ' + token)

    if (token) {

      res = this.http.get(this.uri + 'api/user/projects', {}, this.globalheader);
      return res;

    } else {

      return false;

    }

  }

  public getAllItemsRumahJamur(id: any, token: string = this.apitoken) {

  //   {
  //     "project": {
  //         "id": 1,
  //         "user_id": 2,
  //         "name": "Kumbung rempoah",
  //         "amount_landfields": 8,
  //         "amount_buglog": 400,
  //         "address": "Jl Patimura KM 7 No 18 Purwokerto",
  //         "archived": null,
  //         "created_at": "2018-08-23 06:18:51",
  //         "updated_at": "2018-08-26 14:41:57",
  //         "deleted_at": null,
  //         "landfields": [
  //             {
  //                 "id": 1,
  //                 "project_id": 1,
  //                 "qty_buglog": 15,
  //                 "open_plan_at": "2018-08-27",
  //                 "close_plan_at": null,
  //                 "last_yields": null,
  //                 "deleted_at": null
  //             }
  //         ],
  //         "iotdevices": [
  //             {
  //                 "id": 1,
  //                 "project_id": 1,
  //                 "iot_device_id": 3,
  //                 "created_at": "2018-08-23 20:41:25",
  //                 "updated_at": "2018-08-23 20:41:25",
  //                 "deleted_at": null,
  //                 "item": {
  //                     "id": 3,
  //                     "user_id": 2,
  //                     "SN": "10210991",
  //                     "token": "Jhuq81kjis",
  //                     "description": "SASaksj",
  //                     "qr_code": null,
  //                     "registered_android": "1",
  //                     "type_id": 2,
  //                     "created_at": "2018-08-23 06:17:37",
  //                     "updated_at": "2018-08-25 20:16:56",
  //                     "deleted_at": null,
  //                     "available": "no",
  //                     "setting_parameters": [
  //                         {
  //                             "id": 1,
  //                             "iot_device_id": 3,
  //                             "parameter_id": 1,
  //                             "range_min": 20,
  //                             "range_max": 28,
  //                             "chart_type": "gauge",
  //                             "order": null,
  //                             "created_at": "2018-08-23 06:17:37",
  //                             "updated_at": "2018-08-23 06:17:37",
  //                             "parameters": {
  //                                 "id": 1,
  //                                 "parameter": "Suhu",
  //                                 "description": null,
  //                                 "unit": "℃",
  //                                 "range_min": 20,
  //                                 "range_max": 28,
  //                                 "range_full": 60,
  //                                 "icon": "fa-thermometer-half"
  //                             }
  //                         },
  //                         {
  //                             "id": 2,
  //                             "iot_device_id": 3,
  //                             "parameter_id": 2,
  //                             "range_min": 70,
  //                             "range_max": 90,
  //                             "chart_type": "gauge",
  //                             "order": null,
  //                             "created_at": "2018-08-23 06:17:37",
  //                             "updated_at": "2018-08-24 22:12:29",
  //                             "parameters": {
  //                                 "id": 2,
  //                                 "parameter": "Kelembaban",
  //                                 "description": null,
  //                                 "unit": "%",
  //                                 "range_min": 80,
  //                                 "range_max": 90,
  //                                 "range_full": 100,
  //                                 "icon": "fa-tint"
  //                             }
  //                         },
  //                         {
  //                             "id": 3,
  //                             "iot_device_id": 3,
  //                             "parameter_id": 4,
  //                             "range_min": 0,
  //                             "range_max": 1,
  //                             "chart_type": "switch",
  //                             "order": null,
  //                             "created_at": "2018-08-23 06:17:37",
  //                             "updated_at": "2018-08-23 06:17:37",
  //                             "parameters": {
  //                                 "id": 4,
  //                                 "parameter": "Pompa Air",
  //                                 "description": null,
  //                                 "unit": "",
  //                                 "range_min": 0,
  //                                 "range_max": 1,
  //                                 "range_full": 1,
  //                                 "icon": "fa-shower"
  //                             }
  //                         }
  //                     ]
  //                 }
  //             }
  //         ]
  //     }
  // }

    let res: any;

    this.http.setDataSerializer("json");
    this.http.setHeader(this.host, "Accept", "application/json");
    this.http.setHeader(this.host, "Content-Type", "application/json");
    this.http.setHeader(this.host, 'Authorization', 'Bearer ' + token)

    if (token) {

      res = this.http.get(this.uri + 'api/project/' + id, {}, this.globalheader);
      return res;

    } else {

      return false;

    }

  }

  public getLahanJamur(id: any, token: string = this.apitoken) {

    // [
    //   {
    //       "id": 1,
    //       "project_id": 2,
    //       "qty_buglog": 7,
    //       "open_plan_at": "2018-06-01",
    //       "close_plan_at": "2018-06-01",
    //       "last_yields": "2017-12-12",
    //       "deleted_at": null
    //   }
    // ]

    let res: any;

    this.http.setDataSerializer("json");
    this.http.setHeader(this.host, "Accept", "application/json");
    this.http.setHeader(this.host, "Content-Type", "application/json");
    this.http.setHeader(this.host, 'Authorization', 'Bearer ' + token)

    if (token) {

      res = this.http.get(this.uri + 'api/project/landfields/' + id, {}, this.globalheader);
      return res;

    } else {

      return false;

    }

  }

  /**
   * Penampilan Error Dalam Bentuk String
   * @param $error object
   */
  public _fatal($error: any) {
    // {
    //   status: 403,
    //   error: 'Permission denied',
    //   url: 'http://example.net/noperm'
    //   headers: {
    //     'content-length': '247'
    //   }
    // }
    // convert error to string
    let str: string;

    str = 'Fatal Error : Status ' + $error.status + ', ' + $error.error;

    return str;

  }

}
