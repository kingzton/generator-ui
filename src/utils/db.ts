/**
 * @author: zxj
 * @date:  2023-03-30 17:26
 * @tags:
 */
// db.ts
import Dexie, { Table } from 'dexie';

export class GeneratorDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  templateInfo!: Table<TemplateInfo>;

  constructor() {
    super('generator_master');
    this.version(1).stores({
      templateInfo: '++id, name' // Primary key and indexed props
    });
  }
}

export const db = new GeneratorDexie();
