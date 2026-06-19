import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, test } from 'vitest';
import { AppComponent } from '~/components/AppComponent';
import userEvent from '@testing-library/user-event';
import { createPlayer1, createPlayer2 } from './testData';

describe('App', () => {
  let component: React.ReactElement;
  let player1: ReturnType<typeof createPlayer1>;
  let player2: ReturnType<typeof createPlayer2>;

  beforeEach(() => {
    player1 = createPlayer1();
    player2 = createPlayer2();
    component = <AppComponent player1Board={player1} player2Board={player2} />;
  });

  describe('initial render', () => {
    it('will render 5 ship buttons and a gameboard', () => {
      render(component);

      const board = screen.getAllByRole('region', {
        name: 'The Game Board',
      })[0];
      const carrierButton = screen.getByTestId('carrier');
      const destroyerButton = screen.getByTestId('destroyer');
      const submarineButton = screen.getByTestId('submarine');
      const battleshipButton = screen.getByTestId('battleship');
      const cruiserButton = screen.getByTestId('cruiser');

      expect(board).toBeInTheDocument();
      expect(carrierButton).toBeInTheDocument();
      expect(destroyerButton).toBeInTheDocument();
      expect(submarineButton).toBeInTheDocument();
      expect(battleshipButton).toBeInTheDocument();
      expect(cruiserButton).toBeInTheDocument();
    });
  });

  describe('mouseenter events', () => {
    it('renders the selected ship image on possible locations', async () => {
      const user = userEvent.setup();

      render(component);

      const destroyerButton = screen.getByTestId('destroyer');
      await user.click(destroyerButton);

      const playerBoard = screen.getByRole('region', {
        name: 'The Game Board',
      });

      const button45 = within(playerBoard).getByTestId('45');

      await user.hover(button45);

      const shipDiv_1 = within(button45).getByTestId('right');
      const shipDiv_2 = within(button45).getByTestId('left');
      const shipDiv_3 = within(button45).getByTestId('down');
      const shipDiv_4 = within(button45).getByTestId('up');

      expect(shipDiv_1).toBeInTheDocument();
      expect(shipDiv_1).toHaveClass('right');
      expect(shipDiv_1).toHaveClass('board-destroyer');
      expect(shipDiv_2).toBeInTheDocument();
      expect(shipDiv_2).toHaveClass('left');
      expect(shipDiv_2).toHaveClass('board-destroyer');
      expect(shipDiv_3).toBeInTheDocument();
      expect(shipDiv_3).toHaveClass('down');
      expect(shipDiv_3).toHaveClass('board-destroyer');
      expect(shipDiv_4).toBeInTheDocument();
      expect(shipDiv_4).toHaveClass('up');
      expect(shipDiv_4).toHaveClass('board-destroyer');
    });

    it('will not render more possible locations when a square is selected', async () => {
      const user = userEvent.setup();

      render(component);

      const playerBoard = screen.getByRole('region', {
        name: 'The Game Board',
      });

      const destroyerButton = screen.getByTestId('destroyer');
      await user.click(destroyerButton);

      const button45 = within(playerBoard).getByTestId('45');
      const button35 = within(playerBoard).getByTestId('35');
      const button35Divs = button35.querySelector('div');

      await user.hover(button45);
      await user.click(button45);
      await user.hover(button35);

      expect(button35Divs).toBeNull();
    });
  });

  describe('mouseleave events', () => {
    it('removes ship image on possible locations', async () => {
      const user = userEvent.setup();

      render(component);

      const playerBoard = screen.getByRole('region', {
        name: 'The Game Board',
      });

      const destroyerButton = screen.getByTestId('destroyer');
      const button45 = within(playerBoard).getByTestId('45');
      const button45Div = button45.querySelector('div');

      await user.click(destroyerButton);
      await user.hover(button45);
      await user.unhover(button45);

      expect(button45Div).toBeNull();
    });

    it('it will do nothing when a square is selected', async () => {
      const user = userEvent.setup();

      render(component);

      const playerBoard = screen.getByRole('region', {
        name: 'The Game Board',
      });

      const destroyerButton = screen.getByTestId('destroyer');
      const button45 = within(playerBoard).getByTestId('45');

      await user.click(destroyerButton);
      await user.hover(button45);
      await user.click(button45);
      await user.unhover(button45);

      const shipDiv_1 = within(button45).getByTestId('right');
      const shipDiv_2 = within(button45).getByTestId('left');
      const shipDiv_3 = within(button45).getByTestId('down');
      const shipDiv_4 = within(button45).getByTestId('up');

      expect(shipDiv_1).toBeInTheDocument();
      expect(shipDiv_2).toBeInTheDocument();
      expect(shipDiv_3).toBeInTheDocument();
      expect(shipDiv_4).toBeInTheDocument();
    });
  });

  describe('ship placement phase', () => {
    describe('user', () => {
      test('only one button can be selected at a time', async () => {
        const user = userEvent.setup();

        render(component);

        const buttonOne = screen.getByTestId('carrier');

        await user.click(buttonOne);

        expect(buttonOne).toHaveClass('ship-outline');

        const buttonTwo = screen.getByTestId('destroyer');

        await user.click(buttonTwo);

        expect(buttonOne).not.toHaveClass('ship-outline');
        expect(buttonTwo).toHaveClass('ship-outline');
      });

      test('selecting the same button twice deselects it', async () => {
        const user = userEvent.setup();

        render(component);

        const buttonOne = screen.getByTestId('carrier');

        await user.click(buttonOne);

        expect(buttonOne).toHaveClass('ship-outline');

        await user.click(buttonOne);

        expect(buttonOne).not.toHaveClass('ship-outline');
      });

      test('verify user interface renders a placed ship on the gameboard', async () => {
        const user = userEvent.setup();

        render(component);

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });

        const destroyer = screen.getByTestId('destroyer');
        const button45 = within(playerBoard).getByTestId('45');
        const button47 = within(playerBoard).getByTestId('47');

        await user.click(destroyer);
        await user.click(button45);
        await user.click(button47);

        const shipDiv_1 = within(button45).getByTestId('right');
        const shipDiv_2 = within(button45).queryByTestId('left');
        const shipDiv_3 = within(button45).queryByTestId('up');
        const shipDiv_4 = within(button45).queryByTestId('down');

        expect(shipDiv_1).toBeInTheDocument();
        expect(shipDiv_1).toHaveClass('board-destroyer');
        expect(shipDiv_2).not.toBeInTheDocument();
        expect(shipDiv_3).not.toBeInTheDocument();
        expect(shipDiv_4).not.toBeInTheDocument();
      });

      test('verify user interface renders all 5 placed ships on the gameboard', async () => {
        const user = userEvent.setup();

        render(component);

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });

        const destroyer = screen.getByTestId('destroyer');
        const button45 = within(playerBoard).getByTestId('45');
        const button47 = within(playerBoard).getByTestId('47');
        const carrier = screen.getByTestId('carrier');
        const button55 = within(playerBoard).getByTestId('55');
        const button59 = within(playerBoard).getByTestId('59');
        const battleship = screen.getByTestId('battleship');
        const button0 = within(playerBoard).getByTestId('0');
        const button30 = within(playerBoard).getByTestId('30');
        const submarine = screen.getByTestId('submarine');
        const button99 = within(playerBoard).getByTestId('99');
        const button79 = within(playerBoard).getByTestId('79');
        const cruiser = screen.getByTestId('cruiser');
        const button9 = within(playerBoard).getByTestId('9');
        const button8 = within(playerBoard).getByTestId('8');

        await user.click(destroyer);
        await user.click(button45);
        await user.click(button47);
        await user.click(carrier);
        await user.click(button55);
        await user.click(button59);
        await user.click(battleship);
        await user.click(button0);
        await user.click(button30);
        await user.click(submarine);
        await user.click(button99);
        await user.click(button79);
        await user.click(cruiser);
        await user.click(button9);
        await user.click(button8);

        const destroyerDiv = within(button45).getByTestId('right');
        const carrierDiv = within(button55).getByTestId('right');
        const battleshipDiv = within(button0).getByTestId('down');
        const submarineDiv = within(button99).getByTestId('up');
        const cruiserDiv = within(button9).getByTestId('left');

        expect(destroyerDiv).toBeInTheDocument();
        expect(destroyerDiv).toHaveClass('board-destroyer');
        expect(carrierDiv).toBeInTheDocument();
        expect(carrierDiv).toHaveClass('board-carrier');
        expect(battleshipDiv).toBeInTheDocument();
        expect(battleshipDiv).toHaveClass('board-battleship');
        expect(submarineDiv).toBeInTheDocument();
        expect(submarineDiv).toHaveClass('board-submarine');
        expect(cruiserDiv).toBeInTheDocument();
        expect(cruiserDiv).toHaveClass('board-cruiser');
      });

      test('Placing a ship on non valid locations does nothing', async () => {
        const user = userEvent.setup();

        render(component);

        const carrierButton = screen.getByTestId('carrier');
        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });
        const startPoint = within(playerBoard).getByTestId('35');
        const nonValidSquare67 = within(playerBoard).getByTestId('67');

        await user.click(carrierButton);
        await user.click(startPoint);
        await user.click(nonValidSquare67);

        const shipDiv_1 = within(startPoint).getByTestId('right');
        const shipDiv_2 = within(startPoint).getByTestId('left');
        const shipDiv_3 = within(startPoint).getByTestId('down');
        const square45Div = nonValidSquare67.querySelector('div');

        expect(shipDiv_1).toBeInTheDocument();
        expect(shipDiv_2).toBeInTheDocument();
        expect(shipDiv_3).toBeInTheDocument();
        expect(square45Div).toBeNull();
      });

      test('a ship can be moved after being partially placed', async () => {
        const user = userEvent.setup();

        render(component);

        const cruiserButton = screen.getByTestId('cruiser');
        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });
        const square45 = within(playerBoard).getByTestId('45');

        await user.click(cruiserButton);
        await user.click(square45);

        const cruiserDiv_1 = within(square45).getByTestId('up');
        const cruiserDiv_2 = within(square45).getByTestId('down');
        const cruiserDiv_3 = within(square45).getByTestId('left');
        const cruiserDiv_4 = within(square45).getByTestId('right');

        expect(cruiserDiv_1).toBeInTheDocument();
        expect(cruiserDiv_2).toBeInTheDocument();
        expect(cruiserDiv_3).toBeInTheDocument();
        expect(cruiserDiv_4).toBeInTheDocument();

        await user.dblClick(square45);

        expect(cruiserDiv_1).toBeInTheDocument();
        expect(cruiserDiv_2).toBeInTheDocument();
        expect(cruiserDiv_3).toBeInTheDocument();
        expect(cruiserDiv_4).toBeInTheDocument();
      });

      test('double clicking a placed ship allows it to be moved', async () => {
        const user = userEvent.setup();

        render(component);

        const cruiserButton = screen.getByTestId('cruiser');
        const square34 = screen.getByTestId('34');
        const square35 = screen.getByTestId('35');
        const square78 = screen.getByTestId('78');
        const square79 = screen.getByTestId('79');

        await user.click(cruiserButton);
        await user.click(square34);
        await user.click(square35);

        const shipDiv_1 = within(square34).getByTestId('right');

        expect(shipDiv_1).toBeInTheDocument();

        await user.dblClick(square34);

        expect(shipDiv_1).toBeInTheDocument();

        await user.click(square78);
        await user.click(square79);

        const shipDiv_2 = within(square78).getByTestId('right');

        expect(shipDiv_2).toBeInTheDocument();
      });

      test('moving a placed ship while another is selected, will change the selected ship to the last placed ship', async () => {
        const user = userEvent.setup();

        render(component);

        const cruiserButton = screen.getByTestId('cruiser');
        const destroyerButton = screen.getByTestId('destroyer');
        const board = screen.getByRole('region', { name: 'The Game Board' });
        const square34 = within(board).getByTestId('34');
        const square35 = within(board).getByTestId('35');
        const square23 = within(board).getByTestId('23');

        await user.click(cruiserButton);
        await user.click(square34);
        await user.click(square35);
        await user.click(destroyerButton);
        await user.click(square23);
        await user.dblClick(square34);

        const square35Divs = square35.querySelector('div');
        const cruiserDiv_1 = within(square23).getByTestId('up');
        const cruiserDiv_2 = within(square23).getByTestId('down');
        const cruiserDiv_3 = within(square23).getByTestId('left');
        const cruiserDiv_4 = within(square23).getByTestId('right');

        expect(square35Divs).toBeNull();
        expect(cruiserDiv_1).toBeInTheDocument();
        expect(cruiserDiv_2).toBeInTheDocument();
        expect(cruiserDiv_3).toBeInTheDocument();
        expect(cruiserDiv_4).toBeInTheDocument();

        expect(cruiserButton).toHaveClass('ship-outline');
      });

      test('double click will do nothing if no ship is placed on the square', async () => {
        const user = userEvent.setup();

        render(component);

        const carrierButton = screen.getByTestId('cruiser');
        const square32 = screen.getByTestId('32');
        const square99 = screen.getByTestId('99');

        await user.click(carrierButton);
        await user.click(square32);
        await user.dblClick(square99);

        const shipDiv_1 = within(square32).getByTestId('right');
        const shipDiv_2 = within(square32).getByTestId('left');
        const shipDiv_3 = within(square32).getByTestId('down');
        const shipDiv_4 = within(square32).getByTestId('up');

        expect(shipDiv_1).toBeInTheDocument();
        expect(shipDiv_2).toBeInTheDocument();
        expect(shipDiv_3).toBeInTheDocument();
        expect(shipDiv_4).toBeInTheDocument();
      });
    });
  });

  describe('attack phase', () => {
    describe('initial render', () => {
      test('verify ai gameboard renders after all ships have been placed', async () => {
        const user = userEvent.setup();

        render(component);

        let aiBoard = screen.queryByRole('region', { name: 'Ai Game Board' });

        expect(aiBoard).not.toBeInTheDocument();

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });

        const destroyer = screen.getByTestId('destroyer');
        const button45 = within(playerBoard).getByTestId('45');
        const button47 = within(playerBoard).getByTestId('47');
        const carrier = screen.getByTestId('carrier');
        const button55 = within(playerBoard).getByTestId('55');
        const button59 = within(playerBoard).getByTestId('59');
        const battleship = screen.getByTestId('battleship');
        const button0 = within(playerBoard).getByTestId('0');
        const button30 = within(playerBoard).getByTestId('30');
        const submarine = screen.getByTestId('submarine');
        const button99 = within(playerBoard).getByTestId('99');
        const button79 = within(playerBoard).getByTestId('79');
        const cruiser = screen.getByTestId('cruiser');
        const button9 = within(playerBoard).getByTestId('9');
        const button8 = within(playerBoard).getByTestId('8');

        await user.click(destroyer);
        await user.click(button45);
        await user.click(button47);
        await user.click(carrier);
        await user.click(button55);
        await user.click(button59);
        await user.click(battleship);
        await user.click(button0);
        await user.click(button30);
        await user.click(submarine);
        await user.click(button99);
        await user.click(button79);
        await user.click(cruiser);
        await user.click(button9);
        await user.click(button8);

        aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });

        expect(aiBoard).toBeInTheDocument();
      });

      test('ai gameboard will not render placed ships', async () => {
        const user = userEvent.setup();

        render(component);

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });

        const destroyer = screen.getByTestId('destroyer');
        const button45 = within(playerBoard).getByTestId('45');
        const button47 = within(playerBoard).getByTestId('47');
        const carrier = screen.getByTestId('carrier');
        const button55 = within(playerBoard).getByTestId('55');
        const button59 = within(playerBoard).getByTestId('59');
        const battleship = screen.getByTestId('battleship');
        const button0 = within(playerBoard).getByTestId('0');
        const button30 = within(playerBoard).getByTestId('30');
        const submarine = screen.getByTestId('submarine');
        const button99 = within(playerBoard).getByTestId('99');
        const button79 = within(playerBoard).getByTestId('79');
        const cruiser = screen.getByTestId('cruiser');
        const button9 = within(playerBoard).getByTestId('9');
        const button8 = within(playerBoard).getByTestId('8');

        await user.click(destroyer);
        await user.click(button45);
        await user.click(button47);
        await user.click(carrier);
        await user.click(button55);
        await user.click(button59);
        await user.click(battleship);
        await user.click(button0);
        await user.click(button30);
        await user.click(submarine);
        await user.click(button99);
        await user.click(button79);
        await user.click(cruiser);
        await user.click(button9);
        await user.click(button8);

        const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
        const aiBoardButtons = within(aiBoard).getAllByRole('button', {
          name: '',
        });

        aiBoardButtons.forEach((button) => {
          const buttonDiv = button.querySelector('div');
          expect(buttonDiv).toBeNull();
        });
      });

      test('verify ship buttons are not rendered after all ships have been placed', async () => {
        const user = userEvent.setup();

        render(component);

        const shipContainer = screen.getByRole('region', {
          name: 'The ship buttons',
        });

        expect(shipContainer).toBeInTheDocument();

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });

        const destroyer = screen.getByTestId('destroyer');
        const button45 = within(playerBoard).getByTestId('45');
        const button47 = within(playerBoard).getByTestId('47');
        const carrier = screen.getByTestId('carrier');
        const button55 = within(playerBoard).getByTestId('55');
        const button59 = within(playerBoard).getByTestId('59');
        const battleship = screen.getByTestId('battleship');
        const button0 = within(playerBoard).getByTestId('0');
        const button30 = within(playerBoard).getByTestId('30');
        const submarine = screen.getByTestId('submarine');
        const button99 = within(playerBoard).getByTestId('99');
        const button79 = within(playerBoard).getByTestId('79');
        const cruiser = screen.getByTestId('cruiser');
        const button9 = within(playerBoard).getByTestId('9');
        const button8 = within(playerBoard).getByTestId('8');

        await user.click(destroyer);
        await user.click(button45);
        await user.click(button47);
        await user.click(carrier);
        await user.click(button55);
        await user.click(button59);
        await user.click(battleship);
        await user.click(button0);
        await user.click(button30);
        await user.click(submarine);
        await user.click(button99);
        await user.click(button79);
        await user.click(cruiser);
        await user.click(button9);
        await user.click(button8);

        const noShipContainer = screen.queryByRole('region', {
          name: 'The ship buttons',
        });

        expect(noShipContainer).not.toBeInTheDocument();
      });
    });

    describe('user input', () => {
      test('verify a hit renders on the ai gameboard', async () => {
        const user = userEvent.setup();
        player2.board[23].ship = player2.props.allShips[0];
        player2.props.allShipsPlaced = true;
        player1.props.allShipsPlaced = true;

        render(component);

        const aiBoard = screen.getByRole('region', {
          name: 'Ai Game Board',
        });
        const button23 = within(aiBoard).getByTestId('23');

        await user.click(button23);

        const hitDiv = within(button23).getByTestId('hit');

        expect(hitDiv).toBeInTheDocument();
      });

      test('verify a miss will render on the ai game board', async () => {
        const user = userEvent.setup();
        player2.props.allShipsPlaced = true;
        player1.props.allShipsPlaced = true;

        render(component);

        const aiBoard = screen.getByRole('region', {
          name: 'Ai Game Board',
        });
        const button23 = within(aiBoard).getByTestId('23');

        await user.click(button23);

        const missDiv = within(button23).getByTestId('miss');

        expect(missDiv).toBeInTheDocument();
      });

      test('a sunk ship will render on ai game board', async () => {
        const user = userEvent.setup();
        player2.board[45].ship = player2.props.allShips[4];
        player2.board[45].ship.props.direction = 'right';
        player2.board[46].ship = player2.props.allShips[4];
        player2.board[45].ship.props.shipStartPoint = 45;
        player2.board[45].ship.props.shipEndPoint = 46;
        player1.props.allShipsPlaced = true;
        player2.props.allShipsPlaced = true;

        render(component);

        const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
        const aiBoardButton45 = within(aiBoard).getByTestId('45');
        const aiBoardButton46 = within(aiBoard).getByTestId('46');

        await user.click(aiBoardButton45);
        await user.click(aiBoardButton46);

        screen.debug(aiBoardButton45);

        const button45ShipDiv = within(aiBoardButton45).getByTestId('right');
        const button45HitDiv = within(aiBoardButton45).getByTestId('hit');
        const button46HitDiv = within(aiBoardButton46).getByTestId('hit');

        expect(button45ShipDiv).toBeInTheDocument();
        expect(button45HitDiv).toBeInTheDocument();
        expect(button46HitDiv).toBeInTheDocument();
      });
    });

    describe('ai', () => {
      test('verify a hit will render on the player game board', async () => {
        const user = userEvent.setup();
        player2.props.allShipsPlaced = true;
        player1.props.allShipsPlaced = true;
        player1.board.forEach((square) => {
          square.ship = player1.props.allShips[0];
        });

        render(component);

        const aiBoard = screen.getByRole('region', {
          name: 'Ai Game Board',
        });
        const button23 = within(aiBoard).getByTestId('23');
        await user.click(button23);

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });
        const boardButtons = within(playerBoard).getAllByRole('button', {
          name: '',
        });

        const foundHit = boardButtons.some((button) => {
          const hitDiv = within(button).queryByTestId('hit');
          return hitDiv;
        });

        expect(foundHit).toBe(true);
      });

      test('verify a miss will render on the player game board', async () => {
        const user = userEvent.setup();
        player2.props.allShipsPlaced = true;
        player1.props.allShipsPlaced = true;

        render(component);

        const aiBoard = screen.getByRole('region', {
          name: 'Ai Game Board',
        });
        const button23 = within(aiBoard).getByTestId('23');
        await user.click(button23);

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });

        const boardButtons = within(playerBoard).getAllByRole('button', {
          name: '',
        });

        const foundMiss = boardButtons.some((button) => {
          const missDiv = within(button).queryByTestId('miss');
          return missDiv;
        });

        expect(foundMiss).toBe(true);
      });

      test('a sunk ship will render on user game board', async () => {
        const string45 = '45';
        const string46 = '46';
        player2.props.allShipsPlaced = true;
        player1.props.allShipsPlaced = true;
        player1.board[Number(string45)].ship = player1.props.allShips[4];
        player1.board[Number(string45)].ship!.props.direction = 'right';
        player1.board[Number(string46)].ship = player1.props.allShips[4];
        player1.board.forEach((square) => {
          if (square.id !== Number(string45)) {
            player1.board[square.id].isMiss = true;
          }
        });
        player1.board[Number(string46)].isHit = true;
        player1.board[Number(string46)].ship?.isHit(Number(string46));
        const user = userEvent.setup();

        render(component);

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });
        const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
        const aiButton54 = within(aiBoard).getByTestId('54');

        await user.click(aiButton54);

        const playerBoard45 = within(playerBoard).getByTestId('45');
        const hitDiv45 = within(playerBoard45).getByTestId('hit');
        const shipImage = within(playerBoard45).getByTestId('right');
        const playerBoard46 = within(playerBoard).getByTestId('46');
        const hitDiv46 = within(playerBoard46).getByTestId('hit');

        expect(hitDiv45).toBeInTheDocument();
        expect(shipImage).toBeInTheDocument();
        expect(hitDiv46).toBeInTheDocument();
      });
    });
  });

  describe('game over', () => {
    describe('game over menu', () => {
      it('renders with you win', async () => {
        const user = userEvent.setup();
        player1.props.allShipsPlaced = true;
        player2.props.allShipsPlaced = true;
        player2.props.allShips[0].props.sunk = true;
        player2.props.allShips[1].props.sunk = true;
        player2.props.allShips[2].props.sunk = true;
        player2.props.allShips[3].props.sunk = true;
        player2.board[53].ship = player2.props.allShips[4];
        player2.board[54].ship = player2.props.allShips[4];

        render(component);

        const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
        const aiButton54 = within(aiBoard).getByTestId('54');
        await user.click(aiButton54);
        const aiButton53 = within(aiBoard).getByTestId('53');
        await user.click(aiButton53);

        const gameOverMenu = screen.getByRole('dialog');
        const gameOverText = within(gameOverMenu).getByRole('heading', {
          name: 'You Win',
        });

        expect(gameOverText).toBeInTheDocument();
      });

      it('renders with you lose', async () => {
        const user = userEvent.setup();
        player1.props.allShips[0].props.isPlaced = true;
        player1.props.allShips[1].props.isPlaced = true;
        player1.props.allShips[2].props.isPlaced = true;
        player1.props.allShips[3].props.isPlaced = true;
        player1.props.allShips[0].props.sunk = true;
        player1.props.allShips[1].props.sunk = true;
        player1.props.allShips[2].props.sunk = true;
        player1.props.allShips[3].props.sunk = true;
        const string45 = '45';
        const string46 = '46';
        player1.board.forEach((square) => {
          if (
            square.id !== Number(string45) &&
            square.id !== Number(string46)
          ) {
            player1.board[square.id].isMiss = true;
          }
        });

        render(component);

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });

        const cruiser = screen.getByTestId('cruiser');
        await user.click(cruiser);

        const button45 = within(playerBoard).getByTestId(string45);
        await user.click(button45);

        const button46 = within(playerBoard).getByTestId(string46);
        await user.click(button46);

        const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
        const aiButton54 = within(aiBoard).getByTestId('54');
        await user.click(aiButton54);
        const aiButton53 = within(aiBoard).getByTestId('53');
        await user.click(aiButton53);

        const gameOverMenu = screen.getByRole('dialog');
        const gameOverText = within(gameOverMenu).getByRole('heading', {
          name: 'You Lose',
        });

        expect(gameOverText).toBeInTheDocument();
      });

      describe('play again button', () => {
        it('allows another game to be played', async () => {
          const user = userEvent.setup();
          player1.props.allShips[0].props.isPlaced = true;
          player1.props.allShips[1].props.isPlaced = true;
          player1.props.allShips[2].props.isPlaced = true;
          player1.props.allShips[3].props.isPlaced = true;
          player1.props.allShips[0].props.sunk = true;
          player1.props.allShips[1].props.sunk = true;
          player1.props.allShips[2].props.sunk = true;
          player1.props.allShips[3].props.sunk = true;
          const string45 = '45';
          const string46 = '46';
          player1.board.forEach((square) => {
            if (
              square.id !== Number(string45) &&
              square.id !== Number(string46)
            ) {
              player1.board[square.id].isMiss = true;
            }
          });

          render(component);

          const playerBoard = screen.getByRole('region', {
            name: 'The Game Board',
          });

          const cruiser = screen.getByTestId('cruiser');
          await user.click(cruiser);

          const button45 = within(playerBoard).getByTestId(string45);
          await user.click(button45);

          const button46 = within(playerBoard).getByTestId(string46);
          await user.click(button46);

          const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
          const aiButton54 = within(aiBoard).getByTestId('54');
          await user.click(aiButton54);
          const aiButton53 = within(aiBoard).getByTestId('53');
          await user.click(aiButton53);

          const gameOverMenu = screen.getByRole('dialog');
          const playAgainButton = within(gameOverMenu).getByRole('button', {
            name: 'Play Again',
          });

          await user.click(playAgainButton);

          const shipsContainer = screen.getByRole('region', {
            name: 'The ship buttons',
          });
          const boardButtons = within(playerBoard).getAllByRole('button', {
            name: '',
          });

          expect(shipsContainer).toBeInTheDocument();
          expect(aiBoard).not.toBeInTheDocument();
          boardButtons.forEach((button) => {
            const divImages = button.querySelector('div');
            expect(divImages).toBe(null);
          });
        });
      });
    });
  });
});
