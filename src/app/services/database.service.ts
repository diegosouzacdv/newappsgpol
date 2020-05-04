import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { Versao } from '../models/versao/versao';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public retorn = new ReplaySubject(1);

  versions = new BehaviorSubject([]);
  versao = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
  this.getDB();
   }
  

  public getDB() {
    const db = this.sqlite.create({
      name: 'versions.db',
      location: 'default'
    })
    if (db != undefined) {
      db.then((db: SQLiteObject) => {
        this.database = db;
        this.seedDatabase();
      });
    }
    return db;
  }

  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadVersions();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }
 
  getVersions(): Observable<Versao[]> {
    return this.versions.asObservable();
  }

   verso (versao: number): Observable<Versao[]> {
     console.log(versao)
     this.loadVersionNumber(versao);
    return this.versao.asObservable();
  }

  loadVersions() {
    return this.database.executeSql(`SELECT * FROM versions WHERE lida = 1`, []).then(data => {
      let versoes: Versao[] = [];
      console.log(data)
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
 
          versoes.push({ 
            id: data.rows.item(i).id,
            versao: data.rows.item(i).versao, 
            mensagemUsuario: data.rows.item(i).mensagemUsuario, 
            lida: data.rows.item(i).lida,
           });
        }
      }
      this.versions.next(versoes);
    });
  }

  loadVersionNumber(versao) {
    let versoes: Versao[] = [];
    this.database.executeSql(`SELECT * FROM versions WHERE versao LIKE ${versao.toString()}`, []).then(data => {
      console.log(data)
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
 
          versoes.push({ 
            id: data.rows.item(i).id,
            versao: data.rows.item(i).versao, 
            mensagemUsuario: data.rows.item(i).mensagemUsuario, 
            lida: data.rows.item(i).lida,
           });
        }
      }
     
    });
      
      return versoes.map(response => this.retorn.next(response));
    
  }

  addVersions(versao: Versao) {
    let data = [versao.id, versao.versao, versao.mensagemUsuario, versao.lida];
    return this.database.executeSql('INSERT INTO versions (versao,  mensagemUsuario, lida) VALUES (?, ?, ?, ?)', data).then(data => {
      this.loadVersions();
    });
  }

  deleteVersion(id) {
    return this.database.executeSql('DELETE FROM versions WHERE id = ?', [id]).then(_ => {
      this.loadVersions();
    });
  }

  updateVersion(versao: Versao) {
    let data = [versao.versao, versao.mensagemUsuario, versao.lida];
    return this.database.executeSql(`UPDATE versions SET versao = ?, observacao = ?, lida = ? WHERE id = ${versao.id}`, data).then(data => {
      this.loadVersions();
    })
  }
}
