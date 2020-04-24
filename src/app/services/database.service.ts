import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
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

  versions = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
      this.getDB();
   }

  public getDB() {
    return this.sqlite.create({
      name: 'versions.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      this.database = db;
      this.seedDatabase();
    });
    
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

  loadVersions() {
    let lida = 0;
    return this.database.executeSql(`SELECT * FROM versions WHERE lida = ${lida}`, []).then(data => {
      let versoes: Versao[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
 
          versoes.push({ 
            id: data.rows.item(i).id,
            versao: data.rows.item(i).versao, 
            url: data.rows.item(i).url, 
            observacao: data.rows.item(i).observacao, 
            lida: data.rows.item(i).lida,
           });
        }
      }
      this.versions.next(versoes);
    });
  }

  addVersions(versao: Versao) {
    let data = [versao.id, versao.versao, versao.url, versao.observacao, versao.lida];
    return this.database.executeSql('INSERT INTO versions (versao, url, observacao, lida) VALUES (?, ?, ?, ?)', data).then(data => {
      this.loadVersions();
    });
  }

  getVersion(id: number): Promise<Versao> {
    return this.database.executeSql('SELECT * FROM versions WHERE id = ?', [id]).then(data => {
      console.log(data)
      return {
        id: data.rows.item(0).id,
        versao: data.rows.item(0).versao, 
        url: data.rows.item(0).url,
        observacao: data.rows.item(0).observacao,
        lida: data.rows.item(0).lida,
      }
    });
  }

  deleteVersion(id) {
    return this.database.executeSql('DELETE FROM versions WHERE id = ?', [id]).then(_ => {
      this.loadVersions();
    });
  }

  updateVersion(versao: Versao) {
    let data = [versao.versao, versao.url, versao.observacao, versao.lida];
    return this.database.executeSql(`UPDATE versions SET versao = ?, url = ?, observacao = ?, lida = ? WHERE id = ${versao.id}`, data).then(data => {
      this.loadVersions();
    })
  }
}
