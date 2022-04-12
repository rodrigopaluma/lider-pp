import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './shared/models/user';
import { CityHall } from './shared/models/city-hall';
import { Secretary } from './shared/models/secretary';

export class Data implements InMemoryDbService{
  createDb() {
      const users: User[] = [
          { userCode: '001', userName: 'admin', userEmail: 'admin@liderpoliticaspublicas.com.br', userProfile: 'Administrador', citiHallCode: '', secCode: '' },
          { userCode: '002', userName: 'rodrigopaluma', userEmail: 'rodrigo.paluma@liderpoliticaspublicas.com.br', userProfile: 'Administrador', citiHallCode: '', secCode: '' },
          { userCode: '003', userName: 'fernandamonteiro', userEmail: 'fernanda.monteiro@liderpoliticaspublicas.com.br', userProfile: 'Administrador', citiHallCode: '', secCode: '' },
          { userCode: '004', userName: 'prefeito', userEmail: 'prefeito@liderpoliticaspublicas.com.br', userProfile: 'Prefeito', citiHallCode: '', secCode: '' },
          { userCode: '005', userName: 'secretario', userEmail: 'secretario@liderpoliticaspublicas.com.br', userProfile: 'Secretário', citiHallCode: '', secCode: '' },
          { userCode: '006', userName: 'usuario', userEmail: 'usuario@liderpoliticaspublicas.com.br', userProfile: 'Usuário', citiHallCode: '', secCode: '' },
      ];

      const cityHalls: CityHall[] = [
        { cityHallCode: '001', cityHallName: 'Araruama', cityHallProvince: 'RJ' },
        { cityHallCode: '002', cityHallName: 'Cabo Frio', cityHallProvince: 'RJ' },
        { cityHallCode: '003', cityHallName: 'Iguaba Grande', cityHallProvince: 'RJ' },
        { cityHallCode: '004', cityHallName: 'Arraial do Cabo', cityHallProvince: 'RJ' },
        { cityHallCode: '005', cityHallName: 'São Pedro da Aldeia', cityHallProvince: 'RJ' },
        { cityHallCode: '006', cityHallName: 'Rio das Ostras', cityHallProvince: 'RJ' },
        { cityHallCode: '007', cityHallName: 'Macaé', cityHallProvince: 'RJ' },
        { cityHallCode: '008', cityHallName: 'Campos dos Goytacases', cityHallProvince: 'RJ' },
        { cityHallCode: '009', cityHallName: 'Maricá', cityHallProvince: 'RJ' },
        { cityHallCode: '010', cityHallName: 'Niterói', cityHallProvince: 'RJ' },
        { cityHallCode: '011', cityHallName: 'São Gonçalo', cityHallProvince: 'RJ' },
        { cityHallCode: '012', cityHallName: 'Rio Bonito', cityHallProvince: 'RJ' },
        { cityHallCode: '013', cityHallName: 'Silva Jardim', cityHallProvince: 'RJ' },
        { cityHallCode: '014', cityHallName: 'Tanguá', cityHallProvince: 'RJ' },
        { cityHallCode: '015', cityHallName: 'Rio de Janeiro', cityHallProvince: 'RJ' },
      ];

      const secretarys: Secretary[] = [
        { secCode: '001', secName: 'Secretaria de Governo', secAbreviation: 'SECGOV-ARA', cityHallCode: cityHalls[0].cityHallCode },
        { secCode: '002', secName: 'Secretaria Municipal de Educação', secAbreviation: 'SECEDU-ARA', cityHallCode: cityHalls[0].cityHallCode },
        { secCode: '003', secName: 'Secretaria Municipal de Desenvolvimento Econômico, Cultural, Turismo, Esporte e Lazer', secAbreviation: 'SECDEC-ARA', cityHallCode: cityHalls[0].cityHallCode },
        { secCode: '004', secName: 'Secretaria de Obras e Urbanismo', secAbreviation: 'SECOBR-ARA', cityHallCode: cityHalls[0].cityHallCode },
        { secCode: '005', secName: 'Secretaria de Meio Ambiente, Agricultura, Abastecimento e Pesca', secAbreviation: 'SECMAP-ARA', cityHallCode: cityHalls[0].cityHallCode },
        { secCode: '006', secName: 'Secretaria Municipal de Administração', secAbreviation: 'SECADM-ARA', cityHallCode: cityHalls[0].cityHallCode },
        { secCode: '007', secName: 'Secretaria Municipal de Fazenda e Planejamento', secAbreviation: 'SECFPL-ARA', cityHallCode: cityHalls[0].cityHallCode },
        { secCode: '008', secName: 'Secretaria Municipal de Saúde', secAbreviation: 'SECSAU-ARA', cityHallCode: cityHalls[0].cityHallCode },
        { secCode: '009', secName: 'Secretaria Municipal de Transportes', secAbreviation: 'SECTRA-ARA', cityHallCode: cityHalls[0].cityHallCode },
        { secCode: '010', secName: 'Secretaria de Municipal de Segurança', secAbreviation: 'SECSEG-ARA', cityHallCode: cityHalls[0].cityHallCode },
        { secCode: '011', secName: 'Secretaria de Governo', secAbreviation: 'SECGOV-ARA', cityHallCode: cityHalls[5].cityHallCode },
        { secCode: '012', secName: 'Secretaria Municipal de Educação', secAbreviation: 'SECEDU-ARA', cityHallCode: cityHalls[4].cityHallCode },
        { secCode: '013', secName: 'Secretaria Municipal de Desenvolvimento Econômico, Cultural, Turismo, Esporte e Lazer', secAbreviation: 'SECDEC-ARA', cityHallCode: cityHalls[4].cityHallCode },
        { secCode: '014', secName: 'Secretaria de Obras e Urbanismo', secAbreviation: 'SECOBR-ARA', cityHallCode: cityHalls[8].cityHallCode },
        { secCode: '015', secName: 'Secretaria de Meio Ambiente, Agricultura, Abastecimento e Pesca', secAbreviation: 'SECMAP-ARA', cityHallCode: cityHalls[7].cityHallCode },
        { secCode: '016', secName: 'Secretaria Municipal de Administração', secAbreviation: 'SECADM-ARA', cityHallCode: cityHalls[2].cityHallCode },
        { secCode: '017', secName: 'Secretaria Municipal de Fazenda e Planejamento', secAbreviation: 'SECFPL-ARA', cityHallCode: cityHalls[2].cityHallCode },
        { secCode: '018', secName: 'Secretaria Municipal de Saúde', secAbreviation: 'SECSAU-ARA', cityHallCode: cityHalls[2].cityHallCode },
        { secCode: '019', secName: 'Secretaria Municipal de Transportes', secAbreviation: 'SECTRA-ARA', cityHallCode: cityHalls[1].cityHallCode },
        { secCode: '020', secName: 'Secretaria de Municipal de Segurança', secAbreviation: 'SECSEG-ARA', cityHallCode: cityHalls[1].cityHallCode },
      ];

      return { users, cityHalls, secretarys };
  }
}
