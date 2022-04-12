import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from './shared/models/user';
import { CityHall } from './shared/models/city-hall';
import { Secretary } from './shared/models/secretary';

export class Data implements InMemoryDbService{
  createDb() {
      const users: User[] = [
          { userCode: '1', userName: 'admin', userEmail: 'admin@liderpoliticaspublicas.com.br', userProfile: 'Administrador', citiHallCode: '', secCode: '' },
          { userCode: '2', userName: 'rodrigopaluma', userEmail: 'rodrigo.paluma@liderpoliticaspublicas.com.br', userProfile: 'Administrador', citiHallCode: '', secCode: '' },
          { userCode: '3', userName: 'fernandamonteiro', userEmail: 'fernanda.monteiro@liderpoliticaspublicas.com.br', userProfile: 'Administrador', citiHallCode: '', secCode: '' },
          { userCode: '4', userName: 'prefeito', userEmail: 'prefeito@liderpoliticaspublicas.com.br', userProfile: 'Prefeito', citiHallCode: '', secCode: '' },
          { userCode: '5', userName: 'secretario', userEmail: 'secretario@liderpoliticaspublicas.com.br', userProfile: 'Secretário', citiHallCode: '', secCode: '' },
          { userCode: '6', userName: 'usuario', userEmail: 'usuario@liderpoliticaspublicas.com.br', userProfile: 'Usuário', citiHallCode: '', secCode: '' },
      ];

      const cityHalls: CityHall[] = [
        { cityHallCode: '001', cityHallName: 'Araruama', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '002', cityHallName: 'Cabo Frio', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '003', cityHallName: 'Iguaba Grande', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '004', cityHallName: 'Arraial do Cabo', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '005', cityHallName: 'São Pedro da Aldeia', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '006', cityHallName: 'Rio das Ostras', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '007', cityHallName: 'Macaé', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '008', cityHallName: 'Campos dos Goytacases', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '009', cityHallName: 'Maricá', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '010', cityHallName: 'Niterói', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '011', cityHallName: 'São Gonçalo', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '012', cityHallName: 'Rio Bonito', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '013', cityHallName: 'Silva Jardim', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '014', cityHallName: 'Tanguá', cityHallProvince: 'RJ'} as CityHall,
        { cityHallCode: '015', cityHallName: 'Rio de Janeiro', cityHallProvince: 'RJ'} as CityHall,
      ];

      const secretarys: Secretary[] = [
        { secCode: '1', secName: 'Secretaria de Governo', secAbreviation: 'SECGOV-ARA', cityHallCode: cityHalls[0]} as Secretary,
        { secCode: '2', secName: 'Secretaria Municipal de Educação', secAbreviation: 'SECEDU-ARA', cityHallCode: cityHalls[0]} as Secretary,
        { secCode: '3', secName: 'Secretaria Municipal de Desenvolvimento Econômico, Cultural, Turismo, Esporte e Lazer', secAbreviation: 'SECDEC-ARA', cityHallCode: cityHalls[0]} as Secretary,
        { secCode: '4', secName: 'Secretaria de Obras e Urbanismo', secAbreviation: 'SECOBR-ARA', cityHallCode: cityHalls[0]} as Secretary,
        { secCode: '5', secName: 'Secretaria de Meio Ambiente, Agricultura, Abastecimento e Pesca', secAbreviation: 'SECMAP-ARA', cityHallCode: cityHalls[0]} as Secretary,
        { secCode: '6', secName: 'Secretaria Municipal de Administração', secAbreviation: 'SECADM-ARA', cityHallCode: cityHalls[0]} as Secretary,
        { secCode: '7', secName: 'Secretaria Municipal de Fazenda e Planejamento', secAbreviation: 'SECFPL-ARA', cityHallCode: cityHalls[0]} as Secretary,
        { secCode: '8', secName: 'Secretaria Municipal de Saúde', secAbreviation: 'SECSAU-ARA', cityHallCode: cityHalls[0]} as Secretary,
        { secCode: '9', secName: 'Secretaria Municipal de Transportes', secAbreviation: 'SECTRA-ARA', cityHallCode: cityHalls[0]} as Secretary,
        { secCode: '10', secName: 'Secretaria de Municipal de Segurança', secAbreviation: 'SECSEG-ARA', cityHallCode: cityHalls[0]} as Secretary,
        { secCode: '11', secName: 'Secretaria de Governo', secAbreviation: 'SECGOV-ARA', cityHallCode: cityHalls[5]} as Secretary,
        { secCode: '12', secName: 'Secretaria Municipal de Educação', secAbreviation: 'SECEDU-ARA', cityHallCode: cityHalls[4]} as Secretary,
        { secCode: '13', secName: 'Secretaria Municipal de Desenvolvimento Econômico, Cultural, Turismo, Esporte e Lazer', secAbreviation: 'SECDEC-ARA', cityHallCode: cityHalls[4]} as Secretary,
        { secCode: '14', secName: 'Secretaria de Obras e Urbanismo', secAbreviation: 'SECOBR-ARA', cityHallCode: cityHalls[8]} as Secretary,
        { secCode: '15', secName: 'Secretaria de Meio Ambiente, Agricultura, Abastecimento e Pesca', secAbreviation: 'SECMAP-ARA', cityHallCode: cityHalls[7]} as Secretary,
        { secCode: '16', secName: 'Secretaria Municipal de Administração', secAbreviation: 'SECADM-ARA', cityHallCode: cityHalls[2]} as Secretary,
        { secCode: '17', secName: 'Secretaria Municipal de Fazenda e Planejamento', secAbreviation: 'SECFPL-ARA', cityHallCode: cityHalls[2]} as Secretary,
        { secCode: '18', secName: 'Secretaria Municipal de Saúde', secAbreviation: 'SECSAU-ARA', cityHallCode: cityHalls[2]} as Secretary,
        { secCode: '19', secName: 'Secretaria Municipal de Transportes', secAbreviation: 'SECTRA-ARA', cityHallCode: cityHalls[1]} as Secretary,
        { secCode: '20', secName: 'Secretaria de Municipal de Segurança', secAbreviation: 'SECSEG-ARA', cityHallCode: cityHalls[1]} as Secretary,
      ];

      return { users, cityHalls, secretarys };
  }
}
