
import 'cypress-file-upload';

describe('test1', () => {
  beforeEach(() => {
    cy.visit('https://demo.testim.io');
  });

  it('validar titulo', () => {
    cy.title('Space & Beyond | Testim.io demo').should('exist');
  })
  it('Busca que exista un destino al espacio llamado', () => {
    cy.contains('Madan').should('exist');
  })
  it('Selecciona fecha de salida.', () => {
    //se selecciono el 28 de abril 2024 ya que se encontraba las demas fechas bloqueadas
    cy.get(':nth-child(1) > [data-react-toolbox="date-picker"] > .theme__input___qUQeP > .theme__inputElement___27dyY').click();
    cy.get('.theme__active___2k63V > span').click();
    cy.get(':nth-child(28) > span').click();
    cy.get('button').last().click();
  })
  it('Elige que el boleto sea para 2 adultos con 1 niño.', () => {
    cy.get('.Hero__form-box___126DY > :nth-child(3) > .theme__input___qUQeP > .theme__inputElement___27dyY').click();
    cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(3)').click();
    cy.get(':nth-child(4) > .theme__input___qUQeP > .theme__inputElement___27dyY').click();
    cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(2)').click();
  })
  it('En tu destino, filtra por planetas de color azul.', () => {
    cy.get('.Hero__hero___1FDXn > :nth-child(4) > .theme__button___1iKuo').click();
    //filter blue
    cy.get('.Gallery__filters-box___1z3SX > :nth-child(2) > .theme__input___qUQeP > .theme__inputElement___27dyY').click();
    cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(4)').click();
  })
  it('Tienes 3 destinos disponibles, reserva el planeta Tayabamba (debe estar como booked).', () => {
    cy.get('.Gallery__filters-box___1z3SX > :nth-child(2) > .theme__input___qUQeP > .theme__inputElement___27dyY').click();
    cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(4)').click();
    cy.contains(':nth-child(2) > .theme__cardTitle___3Tyrr', 'Tayabamba').parent().within(() => {
      cy.contains('Tayabamba').should('exist');
      // Verifica que inicialmente esté bloqueado
      cy.contains('Book').should('exist');
      cy.contains('Book').click();
    });
    cy.contains(':nth-child(2) > .theme__cardTitle___3Tyrr', 'Tayabamba').parent().within(() => {
      cy.contains('Tayabamba').should('exist');
      // Verifica que  esté disponible
      cy.contains('Booked').should('exist');
    });
  })
  it('llena todo los datos del formulario', () => {
    cy.get('.Gallery__filters-box___1z3SX > :nth-child(2) > .theme__input___qUQeP > .theme__inputElement___27dyY').click();
    cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(4)').click();
    cy.contains(':nth-child(2) > .theme__cardTitle___3Tyrr', 'Tayabamba').parent().within(() => {
      cy.contains('Tayabamba').should('exist');
      cy.contains('Book').click();
    });
    cy.contains(':nth-child(2) > .theme__cardTitle___3Tyrr', 'Tayabamba').parent().within(() => {
      cy.contains('Tayabamba').should('exist');
    });
    cy.get('form > :nth-child(1) > .theme__inputElement___27dyY').type('Social Security');
    cy.get('form > :nth-child(2) > .theme__inputElement___27dyY').type('socialsec@gmail.com');
    cy.get(':nth-child(3) > .theme__inputElement___27dyY').type('111-11-1111');
    cy.get(':nth-child(4) > .theme__inputElement___27dyY').type('2124567890');
  })
  it('Carga una fotografía de tu carnet de vacunación', () => {
    cy.get('.Gallery__filters-box___1z3SX > :nth-child(2) > .theme__input___qUQeP > .theme__inputElement___27dyY').click();
    cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(4)').click();
    cy.contains(':nth-child(2) > .theme__cardTitle___3Tyrr', 'Tayabamba').parent().within(() => {
      cy.contains('Book').click();
    });
    cy.fixture('mario.jpg').then(fileContent => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'mario',
        mimeType: 'image/jpg'
      });
    });
  })
  it('Tenemos un código promocional, ingresa el número 30076.', () => {
    cy.get('.Gallery__filters-box___1z3SX > :nth-child(2) > .theme__input___qUQeP > .theme__inputElement___27dyY').click();
    cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(4)').click();
    cy.contains(':nth-child(2) > .theme__cardTitle___3Tyrr', 'Tayabamba').parent().within(() => {
      cy.contains('Book').click();
    });
    cy.get('.flexboxgrid__col-xs-7___3o2m- > .theme__input___qUQeP > .theme__inputElement___27dyY').type('30076');
    cy.get('.flexboxgrid__col-xs-5___1HkK5 > .theme__button___1iKuo').click();
  })
  it('Finalmente realizar el pago.', () => {
    cy.get('.Gallery__filters-box___1z3SX > :nth-child(2) > .theme__input___qUQeP > .theme__inputElement___27dyY').click();
    cy.get('.theme__active___31xyK > .theme__values___1jS4g > :nth-child(4)').click();
    cy.contains(':nth-child(2) > .theme__cardTitle___3Tyrr', 'Tayabamba').parent().within(() => {
      cy.contains('Book').click();
    });
    cy.fixture('mario.jpg').then(fileContent => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'mario',
        mimeType: 'image/jpg'
      });
    });
    cy.get('.flexboxgrid__col-xs-7___3o2m- > .theme__input___qUQeP > .theme__inputElement___27dyY').type('30076');
    cy.get('.flexboxgrid__col-xs-5___1HkK5 > .theme__button___1iKuo').click();
    cy.get(':nth-child(8) > .flexboxgrid__col-xs___1ROHR').click();

  })
})