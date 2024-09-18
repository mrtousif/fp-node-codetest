import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class FileService {
  dataFilePath = join(__dirname, '../../stock.json');

  readData(): Product[] {
    const jsonData = fs.readFileSync(this.dataFilePath, 'utf8');
    return JSON.parse(jsonData);
  }

  writeData(data: Product[]) {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  }
}
