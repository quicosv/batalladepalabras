import { DataTypes, Model } from 'sequelize';
import { db } from '../database/config';

interface SalaAttributes {
  idSala?: number;
  nombre: string;
}

export const Sala = db.define<Model<SalaAttributes>>(
  'Sala',
  {
    idSala: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    tableName: 'salas'
  }
);
