import { DataTypes, Model } from 'sequelize';
import { db } from '../database/config';

interface UsuarioAttributes {
  email: string;
  password: string;
  token: string;
}

export const Usuario = db.define<Model<UsuarioAttributes>>(
  'Usuario',
  {
    email: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    }
  },
  {
    tableName: 'usuarios'
  }
);
