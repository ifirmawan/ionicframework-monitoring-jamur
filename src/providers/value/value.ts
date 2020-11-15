// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ValueProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ValueProvider {

  constructor() {
    // console.log('Hello ValueProvider Provider');
  }

  public valApp         = {
    'errInternet' : 'Koneksi Internet Terputus!'
  };

  public valButtons     = {
    'ok'          : 'Oke',
    'save'        : 'Simpan',
    'proses'      : 'Proses',
    'cancel'      : 'Batal',
    'info'        : 'Info',
    'proyek'      : 'Proyek',
    'user'        : 'Pengguna',
    'login'       : 'Masuk',
    'logout'      : 'Keluar',
    'editPassword': 'Ubah Password',
    'editEmail'   : 'Ubah Email',
    'AddIoTText'  : 'Tambah Device Manual',
    'AddIoTQr'    : 'Scan QRCode Device',
    'AddImageURI' : 'Cari Gambar',
    'AddImageCam' : 'Ambil Gambar'
  }

  // tabs
  public valTabs        = {
    'btnProyek' : 'Proyek',
    'btnAbout'  : 'Perangkat',
    'btnContact': 'Pengguna',
    'infoExit'  : 'Tekan Tombol Back Sekali Lagi Untuk Keluar'
  };

  // form login
  public valMasuk       = {
    'labelPass' : 'Password',
    'labelUname': 'Username',
    'title'     : 'Form Login',
    'titleError': 'Gagal Masuk',
    'labelLoad' : 'Proses Auth...',
    'labelError': 'Gagal masuk, username atau password salah!'
  };

  // Home Page
  public valHome        = {
    'title' : 'Daftar Proyek',
    'labelInfoErrorGetRJ' : 'Terjadi Kesalahan!',
    'labelInfoErrorMsgGetRJ' : 'Tidak dapat mengambil data Rumah Jamur dari server.',
    'labelKetLahan' : 'Lahan',
    'labelKetBaglog': 'Buglog'
  };

  // About Page
  public valAbout       = {
    'title' : 'Perangkat IoT',
    'labelAddIoTText': 'Tambah Device',
    'labelErrorAddIoT'  : 'Gagal Menambahakan IoT',
    'placeholderTokenIoT' : 'Masukan Token IoT',
    'labelRefresh' : 'Segarkan Halaman',
    'labelLoadIoT' : 'Mendapatkan data IoT',
    'labelErrorRefresh' : 'Gagal Memperbaiki data, harap tutup dan masuk kembali!'
  };

  // Contact Page
  public valContact     = {

    'title' : null,
    'changePassword'    : 'Ganti Kata Sandi',
    'changePasswordSub' : 'Ubah Kata Sandi Berkala',
    'changeEmail'       : 'Ganti Alamat Email',
    'changeEmailSub'    : 'contoh@email.mail',
    'aboutApp'          : 'Tentang Aplikasi',
    'logoutApp'         : 'Log Out',
    'msgLogout'         : 'Anda yakin ingin keluar ?',
    'labelLoad'         : 'Proses...',
    'labelPasswordLama' : 'Password Lama',
    'labelPasswordBaru' : 'Password Baru',
    'labelPasswordConf' : 'Ketik Ulang Password Baru',
    'labelEmailLama'    : 'Email Lama',
    'labelEmailBaru'    : 'Email Baru',
    'infoSuccessChangePassword' : 'Berhasil Ubah Password',
    'infoErrorChangePassword'   : 'Gagal Ubah Password',
    'infoSuccessChangeEmail' : 'Berhasil Ubah Email',
    'infoErrorChangeEmail'   : 'Gagal Ubah Email',
    'infoSuccesLogout'  : 'Berhasil Keluar Akun!',
    'infoErrorLogout'   : 'Gagal Keluar!',
    'labelNamaUser'     : 'Nama Anda',
    'labelStatusUser'   : 'Status Anda',
    'labelTitleErrorFind' : 'Gagal Menemukan Data',
    'labelInfoErrorFind' : 'Apakah anda ingin mencarinya lagi?',
    'labelTitleErrorImg' : 'Ubah Foto',
    'labelInfoErrorImg' : 'Gagal mengubah foto pengguna.',
    'labelInfoSuccessImg' : 'Berhasil mengubah foto pengguna.'
  }

  // Lahan Page
  public valLahan       = {
    'InfoErrorItemTitle' : 'Gagal mengambil data',
    'infoErrorItemMsg' : 'Terjadi kesalahan saat mengambil data dari server!',
    'labelLahan'  : 'Lahan',
    'labelBuglog' : 'Buglog',
    'labelPlan'   : 'Tanam',
    'labelPanen'  : 'Panen',
    'labelGauge'  : {
      'label'     : 'Suhu',
      'append'    : '°C',
      'type'      : 'arch', // bisa juga pake yang lain arch full semi
      'cap'       : 'butt', // butt or round
      'thick'     : 15,
      'size'      : 100,
      'thresholds': {
          '0': {
            color: '#3880ff'
          },
          '25': {
            color: '#7044ff'
          },
          '35': {
            color: '#ffce00'
          },
          '50': {
            color: '#f04141'
          }
      }
    },
    'labelSegment'      : {
      'detail': 'Status Terkini',
      'lahan' : 'Lahan Proyek'
    },
    'labelAction'       : {
      'title' : 'Aksi Perangkat'
    },
    'labelMinMax'       : {
      'title'   : 'Min - Max Rasio',
      'subtitle': 'Ubah Min dan Max'
    }
  };

  public valIoTDetail     = {
    'title' : 'SN',
    'labelMin' : 'Min',
    'labelMax' : 'Max',
    'labelUnit': 'Satuan',
    'labelErrorNoIoT' : 'Tidak ada device..',
    'labelTitleMinMax': 'Pengaturan Parameter',
    'labelTitleErrorSet': 'Gagal Set IoT',
    'labelMsgErrorSet' : 'kesalahan terjadi saat set iot ke proyek'
  };

  // page qrscan
  public valModalQrScan   = {
    'title'   : 'QR Code Scanner'
  };

  // Modal Edit Profile
  public valEditProfile   = {
    'title'     : 'Ubah Profile Detail',
    'labelNama'   : 'Nama Anda',
    'labelSubNama': 'Status Anda',
    'labelActionSheet'  : 'Aksi Perangkat Ubah Foto'
  }

  // Modal set iot to project page
  public valModalSIP      = {
    'title' : 'Pasang IoT Ke Project',
    'labelSearch' : 'Cari Project..',
    'labelInfoErrorSet' : 'Kesalahan Saat Pasang IoT',
    'labelInfoErrorMsg' : 'Gagal menambahkan IoT ke proyek (Rumah Jamur).',
    'labelConfirmSet' : 'Anda yakin ingin memasang perangkat ke proyek ini ?'
  };

}
