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
      const button45Style = getComputedStyle(button45);
      expect(button45Style.background).not.toContain('url("destroyer1up.png")');
      expect(button45Style.background).not.toContain(
        'url("destroyer1left.png")',
      );
      expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

      const button46 = within(playerBoard).getByTestId('46');
      const button46Style = getComputedStyle(button46);
      expect(button46Style.background).toContain(
        'url("destroyer-1-right.png")',
      );

      const button47 = within(playerBoard).getByTestId('47');
      const button47Style = getComputedStyle(button47);
      expect(button47Style.background).toContain(
        'url("destroyer-2-right.png")',
      );

      const button55 = within(playerBoard).getByTestId('55');
      const button55Style = getComputedStyle(button55);
      expect(button55Style.background).toContain('url("destroyer-1-down.png")');

      const button65 = within(playerBoard).getByTestId('65');
      const button65Style = getComputedStyle(button65);
      expect(button65Style.background).toContain('url("destroyer-2-down.png")');

      const button44 = within(playerBoard).getByTestId('44');
      const button44Style = getComputedStyle(button44);
      expect(button44Style.background).toContain('url("destroyer-1-left.png")');

      const button43 = within(playerBoard).getByTestId('43');
      const button43Style = getComputedStyle(button43);
      expect(button43Style.background).toContain('url("destroyer-2-left.png")');

      const button35 = within(playerBoard).getByTestId('35');
      const button35Style = getComputedStyle(button35);
      expect(button35Style.background).toContain('url("destroyer-1-up.png")');

      const button25 = within(playerBoard).getByTestId('25');
      const button25Style = getComputedStyle(button25);
      expect(button25Style.background).toContain('url("destroyer-2-up.png")');
    });

    it('will not render more possible locations when a square is selected', async () => {
      const user = userEvent.setup();

      render(component);

      screen.debug();

      const playerBoard = screen.getByRole('region', {
        name: 'The Game Board',
      });

      const destroyerButton = screen.getByTestId('destroyer');
      await user.click(destroyerButton);

      const button45 = within(playerBoard).getByTestId('45');
      const button35 = within(playerBoard).getByTestId('35');

      await user.hover(button45);
      await user.click(button45);

      await user.hover(button35);

      const button36 = within(playerBoard).getByTestId('36');
      const button36Style = getComputedStyle(button36);
      expect(button36Style.background).not.toContain(
        'url("destroyer-1-right.png")',
      );
      expect(button36Style.background).toContain('rgba(0, 0, 0, 0)');

      const button37 = within(playerBoard).getByTestId('37');
      const button37Style = getComputedStyle(button37);
      expect(button36Style.background).not.toContain(
        'url("destroyer-2-right.png")',
      );
      expect(button37Style.background).toContain('rgba(0, 0, 0, 0)');

      const button34 = within(playerBoard).getByTestId('34');
      const button34Style = getComputedStyle(button34);
      expect(button36Style.background).not.toContain(
        'url("destroyer-1-left.png")',
      );
      expect(button34Style.background).toContain('rgba(0, 0, 0, 0)');

      const button33 = within(playerBoard).getByTestId('33');
      const button33Style = getComputedStyle(button33);
      expect(button36Style.background).not.toContain(
        'url("destroyer-2-left.png")',
      );
      expect(button33Style.background).toContain('rgba(0, 0, 0, 0)');

      const button45Style = getComputedStyle(button45);
      expect(button45Style.background).not.toContain(
        'url("destroyer-2-up.png")',
      );
      expect(button45Style.background).not.toContain(
        'url("destroyer-2-left.png")',
      );
      expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

      const button46 = within(playerBoard).getByTestId('46');
      const button46Style = getComputedStyle(button46);
      expect(button46Style.background).toContain(
        'url("destroyer-1-right.png")',
      );

      const button47 = within(playerBoard).getByTestId('47');
      const button47Style = getComputedStyle(button47);
      expect(button47Style.background).toContain(
        'url("destroyer-2-right.png")',
      );

      const button55 = within(playerBoard).getByTestId('55');
      const button55Style = getComputedStyle(button55);
      expect(button55Style.background).toContain('url("destroyer-1-down.png")');

      const button65 = within(playerBoard).getByTestId('65');
      const button65Style = getComputedStyle(button65);
      expect(button65Style.background).toContain('url("destroyer-2-down.png")');

      const button44 = within(playerBoard).getByTestId('44');
      const button44Style = getComputedStyle(button44);
      expect(button44Style.background).toContain('url("destroyer-1-left.png")');

      const button43 = within(playerBoard).getByTestId('43');
      const button43Style = getComputedStyle(button43);
      expect(button43Style.background).toContain('url("destroyer-2-left.png")');

      const button35Style = getComputedStyle(button35);
      expect(button35Style.background).toContain('url("destroyer-1-up.png")');

      const button25 = within(playerBoard).getByTestId('25');
      const button25Style = getComputedStyle(button25);
      expect(button25Style.background).toContain('url("destroyer-2-up.png")');
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
      await user.click(destroyerButton);

      const button45 = within(playerBoard).getByTestId('45');
      await user.hover(button45);
      await user.unhover(button45);

      const button45Style = getComputedStyle(button45);
      expect(button45Style.background).not.toContain(
        'url("destroyer-2-up.png")',
      );
      expect(button45Style.background).not.toContain(
        'url("destroyer-2-left.png")',
      );
      expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

      const button46 = within(playerBoard).getByTestId('46');
      const button46Style = getComputedStyle(button46);
      expect(button46Style.background).not.toContain(
        'url("destroyer-1-right.png")',
      );
      expect(button46Style.background).toContain('rgba(0, 0, 0, 0)');

      const button47 = within(playerBoard).getByTestId('47');
      const button47Style = getComputedStyle(button47);
      expect(button47Style.background).not.toContain(
        'url("destroyer-2-right.png")',
      );
      expect(button47Style.background).toContain('rgba(0, 0, 0, 0)');

      const button55 = within(playerBoard).getByTestId('55');
      const button55Style = getComputedStyle(button55);
      expect(button55Style.background).not.toContain(
        'url("destroyer-1-down.png")',
      );
      expect(button55Style.background).toContain('rgba(0, 0, 0, 0)');

      const button65 = within(playerBoard).getByTestId('65');
      const button65Style = getComputedStyle(button65);
      expect(button65Style.background).not.toContain(
        'url("destroyer-2-down.png")',
      );
      expect(button65Style.background).toContain('rgba(0, 0, 0, 0)');

      const button44 = within(playerBoard).getByTestId('44');
      const button44Style = getComputedStyle(button44);
      expect(button44Style.background).not.toContain(
        'url("destroyer-1-left.png")',
      );
      expect(button44Style.background).toContain('rgba(0, 0, 0, 0)');

      const button43 = within(playerBoard).getByTestId('43');
      const button43Style = getComputedStyle(button43);
      expect(button43Style.background).not.toContain(
        'url("destroyer-0-left.png")',
      );
      expect(button43Style.background).toContain('rgba(0, 0, 0, 0)');

      const button35 = within(playerBoard).getByTestId('35');
      const button35Style = getComputedStyle(button35);
      expect(button35Style.background).not.toContain(
        'url("destroyer-1-up.png")',
      );
      expect(button35Style.background).toContain('rgba(0, 0, 0, 0)');

      const button25 = within(playerBoard).getByTestId('25');
      const button25Style = getComputedStyle(button25);
      expect(button25Style.background).not.toContain(
        'url("destroyer-0-up.png")',
      );
      expect(button25Style.background).toContain('rgba(0, 0, 0, 0)');
    });

    it('it will do nothing when a square is selected', async () => {
      const user = userEvent.setup();

      render(component);

      const playerBoard = screen.getByRole('region', {
        name: 'The Game Board',
      });

      const destroyerButton = screen.getByTestId('destroyer');
      await user.click(destroyerButton);

      const button45 = within(playerBoard).getByTestId('45');
      await user.hover(button45);
      await user.click(button45);

      await user.unhover(button45);

      const button45Style = getComputedStyle(button45);
      expect(button45Style.background).not.toContain(
        'url("destroyer-2-up.png")',
      );
      expect(button45Style.background).not.toContain(
        'url("destroyer-2-left.png")',
      );
      expect(button45Style.background).toContain('rgba(0, 0, 0, 0)');

      const button46 = within(playerBoard).getByTestId('46');
      const button46Style = getComputedStyle(button46);
      expect(button46Style.background).toContain(
        'url("destroyer-1-right.png")',
      );

      const button47 = within(playerBoard).getByTestId('47');
      const button47Style = getComputedStyle(button47);
      expect(button47Style.background).toContain(
        'url("destroyer-2-right.png")',
      );

      const button55 = within(playerBoard).getByTestId('55');
      const button55Style = getComputedStyle(button55);
      expect(button55Style.background).toContain('url("destroyer-1-down.png")');

      const button65 = within(playerBoard).getByTestId('65');
      const button65Style = getComputedStyle(button65);
      expect(button65Style.background).toContain('url("destroyer-2-down.png")');

      const button44 = within(playerBoard).getByTestId('44');
      const button44Style = getComputedStyle(button44);
      expect(button44Style.background).toContain('url("destroyer-1-left.png")');

      const button43 = within(playerBoard).getByTestId('43');
      const button43Style = getComputedStyle(button43);
      expect(button43Style.background).toContain('url("destroyer-2-left.png")');

      const button35 = within(playerBoard).getByTestId('35');
      const button35Style = getComputedStyle(button35);
      expect(button35Style.background).toContain('url("destroyer-1-up.png")');

      const button25 = within(playerBoard).getByTestId('25');
      const button25Style = getComputedStyle(button25);
      expect(button25Style.background).toContain('url("destroyer-2-up.png")');
    });
  });

  describe('ship placement phase', () => {
    describe('user', () => {
      test('only one button can be selected at a time', async () => {
        const user = userEvent.setup();

        render(component);

        const buttonOne = screen.getByTestId('carrier');
        const styleOne = getComputedStyle(buttonOne);

        expect(styleOne.background).toContain('url("carrier.png")');

        await user.click(buttonOne);

        const newStyleOne = getComputedStyle(buttonOne);

        expect(newStyleOne.background).toContain(
          'url("highlighted-carrier.png")',
        );

        const buttonTwo = screen.getByTestId('destroyer');
        const styleTwo = getComputedStyle(buttonTwo);

        expect(styleTwo.background).toContain('url("destroyer.png")');

        await user.click(buttonTwo);

        const newStyleTwo = getComputedStyle(buttonTwo);
        const buttonOneAgain = screen.getByTestId('carrier');
        const styleOneAgain = getComputedStyle(buttonOneAgain);

        expect(newStyleTwo.background).toContain(
          'url("highlighted-destroyer.png")',
        );
        expect(styleOneAgain.background).toContain('url("carrier.png")');
      });

      test('selecting the same button twice deselects it', async () => {
        const user = userEvent.setup();

        render(component);

        const buttonOne = screen.getByTestId('carrier');
        let style = getComputedStyle(buttonOne);

        await user.click(buttonOne);

        style = getComputedStyle(buttonOne);

        expect(style.background).toContain('url("highlighted-carrier.png")');

        await user.click(buttonOne);

        style = getComputedStyle(buttonOne);

        expect(style.background).toContain('url("carrier.png")');
      });

      test('verify user interface renders a placed ship on the gameboard', async () => {
        const user = userEvent.setup();

        render(component);

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });

        const destroyer = screen.getByTestId('destroyer');
        await user.click(destroyer);

        const destroyerStyle = getComputedStyle(destroyer);

        expect(destroyerStyle.background).toContain(
          'url("highlighted-destroyer.png")',
        );

        const button45 = within(playerBoard).getByTestId('45');
        await user.hover(button45);
        await user.click(button45);
        await user.unhover(button45);

        const button46 = within(playerBoard).getByTestId('46');
        await user.hover(button46);
        await user.unhover(button46);
        const button46Style = getComputedStyle(button46);
        expect(button46Style.background).toContain(
          'url("destroyer-1-right.png")',
        );

        const button47 = within(playerBoard).getByTestId('47');
        await user.hover(button47);
        await user.click(button47);
        await user.unhover(button47);
        const button47Style = getComputedStyle(button47);
        expect(button47Style.background).toContain(
          'url("destroyer-2-right.png")',
        );

        const button45Style = getComputedStyle(button45);

        expect(button45Style.background).toContain(
          'url("destroyer-0-right.png")',
        );
        const button25 = within(playerBoard).getByTestId('25');
        const button25Style = getComputedStyle(button25);
        expect(button25Style.background).not.toContain(
          'url("destroyer-0-up.png")',
        );
        expect(button25Style.background).toContain('rgba(0, 0, 0, 0)');
      });

      //! redundant test
      test('verify user interface renders all 5 placed ships on the gameboard', async () => {
        const user = userEvent.setup();

        render(component);

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });

        const destroyer = screen.getByTestId('destroyer');
        await user.click(destroyer);

        const destroyerStyle = getComputedStyle(destroyer);

        expect(destroyerStyle.background).toContain(
          'url("highlighted-destroyer.png")',
        );

        const button45 = within(playerBoard).getByTestId('45');
        await user.hover(button45);
        await user.click(button45);
        await user.unhover(button45);

        const button46 = within(playerBoard).getByTestId('46');
        await user.hover(button46);
        await user.unhover(button46);
        const button46Style = getComputedStyle(button46);
        expect(button46Style.background).toContain(
          'url("destroyer-1-right.png")',
        );

        const button47 = within(playerBoard).getByTestId('47');
        await user.hover(button47);
        await user.click(button47);
        await user.unhover(button47);
        const button47Style = getComputedStyle(button47);
        expect(button47Style.background).toContain(
          'url("destroyer-2-right.png")',
        );

        const button45Style = getComputedStyle(button45);

        expect(button45Style.background).toContain(
          'url("destroyer-0-right.png")',
        );

        const carrier = screen.getByTestId('carrier');
        await user.click(carrier);

        const carrierStyle = getComputedStyle(carrier);

        expect(carrierStyle.background).toContain(
          'url("highlighted-carrier.png")',
        );

        const button55 = within(playerBoard).getByTestId('55');
        await user.hover(button55);
        await user.click(button55);
        await user.unhover(button55);

        const button56 = within(playerBoard).getByTestId('56');
        await user.hover(button56);
        await user.unhover(button56);
        const button56Style = getComputedStyle(button56);
        expect(button56Style.background).toContain(
          'url("carrier-1-right.png")',
        );

        const button57 = within(playerBoard).getByTestId('57');
        await user.hover(button57);
        await user.unhover(button57);
        const button57Style = getComputedStyle(button57);
        expect(button57Style.background).toContain(
          'url("carrier-2-right.png")',
        );

        const button58 = within(playerBoard).getByTestId('58');
        await user.hover(button58);
        await user.unhover(button58);
        const button58Style = getComputedStyle(button58);
        expect(button58Style.background).toContain(
          'url("carrier-3-right.png")',
        );

        const button59 = within(playerBoard).getByTestId('59');
        await user.hover(button59);
        await user.click(button59);
        await user.unhover(button59);
        const button59Style = getComputedStyle(button59);
        expect(button59Style.background).toContain(
          'url("carrier-4-right.png")',
        );

        const button55Style = getComputedStyle(button55);

        expect(button55Style.background).toContain(
          'url("carrier-0-right.png")',
        );

        const battleship = screen.getByTestId('battleship');
        await user.click(battleship);
        const battleshipStyle = getComputedStyle(battleship);

        expect(battleshipStyle.background).toContain(
          'url("highlighted-battleship.png")',
        );

        const button0 = within(playerBoard).getByTestId('0');
        await user.hover(button0);
        await user.click(button0);
        await user.unhover(button0);

        const button10 = within(playerBoard).getByTestId('10');
        await user.hover(button10);
        await user.unhover(button10);
        const button10Style = getComputedStyle(button10);
        expect(button10Style.background).toContain(
          'url("battleship-1-down.png")',
        );

        const button20 = within(playerBoard).getByTestId('20');
        await user.hover(button20);
        await user.unhover(button20);
        const button20Style = getComputedStyle(button20);
        expect(button20Style.background).toContain(
          'url("battleship-2-down.png")',
        );

        const button30 = within(playerBoard).getByTestId('30');
        await user.hover(button30);
        await user.click(button30);
        await user.unhover(button30);
        const button30Style = getComputedStyle(button30);
        expect(button30Style.background).toContain(
          'url("battleship-3-down.png")',
        );

        const button0Style = getComputedStyle(button0);

        expect(button0Style.background).toContain(
          'url("battleship-0-down.png")',
        );

        const submarine = screen.getByTestId('submarine');
        await user.click(submarine);

        const submarineStyle = getComputedStyle(submarine);

        expect(submarineStyle.background).toContain(
          'url("highlighted-submarine.png")',
        );

        const button99 = within(playerBoard).getByTestId('99');
        await user.hover(button99);
        await user.click(button99);
        await user.unhover(button99);

        const button89 = within(playerBoard).getByTestId('89');
        await user.hover(button89);
        await user.unhover(button89);
        const button89Style = getComputedStyle(button89);
        expect(button89Style.background).toContain('url("submarine-1-up.png")');

        const button79 = within(playerBoard).getByTestId('79');
        await user.hover(button79);
        await user.click(button79);
        await user.unhover(button79);
        const button79Style = getComputedStyle(button79);
        expect(button79Style.background).toContain('url("submarine-0-up.png")');

        const button99Style = getComputedStyle(button99);

        expect(button99Style.background).toContain('url("submarine-2-up.png")');

        const cruiser = screen.getByTestId('cruiser');
        await user.click(cruiser);

        const cruiserStyle = getComputedStyle(cruiser);

        expect(cruiserStyle.background).toContain(
          'url("highlighted-cruiser.png")',
        );

        const button9 = within(playerBoard).getByTestId('9');
        await user.hover(button9);
        await user.click(button9);
        await user.unhover(button9);

        const button8 = within(playerBoard).getByTestId('8');
        await user.hover(button8);
        await user.click(button8);
        await user.unhover(button8);
        const button8Style = getComputedStyle(button8);
        expect(button8Style.background).toContain('url("cruiser-0-left.png")');

        const button9Style = getComputedStyle(button9);

        expect(button9Style.background).toContain('url("cruiser-1-left.png")');
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

        const allBoardSquares = within(playerBoard).getAllByRole('button', {
          name: '',
        });

        // start point = 35
        // possible placements = [36, 37, 38, 39, 45, 55, 65, 75, 34, 33, 32, 31]
        expect(allBoardSquares[35].style.background).toEqual(
          'rgba(0, 0, 0, 0)',
        );
        expect(allBoardSquares[36].style.background).toContain(
          'url("carrier-1-right.png")',
        );
        expect(allBoardSquares[37].style.background).toContain(
          'url("carrier-2-right.png")',
        );
        expect(allBoardSquares[38].style.background).toContain(
          'url("carrier-3-right.png")',
        );
        expect(allBoardSquares[39].style.background).toContain(
          'url("carrier-4-right.png")',
        );
        expect(allBoardSquares[45].style.background).toContain(
          'url("carrier-1-down.png")',
        );
        expect(allBoardSquares[55].style.background).toContain(
          'url("carrier-2-down.png")',
        );
        expect(allBoardSquares[65].style.background).toContain(
          'url("carrier-3-down.png")',
        );
        expect(allBoardSquares[75].style.background).toContain(
          'url("carrier-4-down.png")',
        );
        expect(allBoardSquares[34].style.background).toContain(
          'url("carrier-1-left.png")',
        );
        expect(allBoardSquares[33].style.background).toContain(
          'url("carrier-2-left.png")',
        );
        expect(allBoardSquares[32].style.background).toContain(
          'url("carrier-3-left.png")',
        );
        expect(allBoardSquares[31].style.background).toContain(
          'url("carrier-4-left.png")',
        );
        expect(nonValidSquare67.style.background).toEqual('rgba(0, 0, 0, 0)');
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
        await user.dblClick(square45);

        const allSquares = within(playerBoard).getAllByRole('button', {
          name: '',
        });

        allSquares.forEach((square) => {
          expect(square.style.background).toEqual('rgba(0, 0, 0, 0)');
        });
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

        expect(square34.style.background).toContain('cruiser-0-right.png');
        expect(square35.style.background).toContain('cruiser-1-right.png');

        await user.dblClick(square34);

        expect(square34.style.background).toEqual('rgba(0, 0, 0, 0)');
        expect(square35.style.background).toEqual('rgba(0, 0, 0, 0)');
        expect(cruiserButton.style.background).toContain(
          'highlighted-cruiser.png',
        );

        await user.click(square78);
        await user.click(square79);

        expect(square78.style.background).toContain('cruiser-0-right.png');
        expect(square79.style.background).toContain('cruiser-1-right.png');
      });

      test('moving a placed ship while another is selected, will change the selected ship to the last placed ship', async () => {
        const user = userEvent.setup();

        render(component);

        const cruiserButton = screen.getByTestId('cruiser');
        const destroyerButton = screen.getByTestId('destroyer');
        const board = screen.getByRole('region', { name: 'The Game Board' });
        const allButtons = within(board).getAllByRole('button', { name: '' });
        const square34 = within(board).getByTestId('34');
        const square35 = within(board).getByTestId('35');
        const square67 = within(board).getByTestId('67');
        const square68 = within(board).getByTestId('68');
        const square23 = within(board).getByTestId('23');
        const square24 = within(board).getByTestId('24');
        const square25 = within(board).getByTestId('25');

        await user.click(cruiserButton);
        await user.click(square34);
        await user.click(square35);
        await user.click(destroyerButton);
        await user.click(square23);
        await user.dblClick(square34);
        allButtons.forEach((button) => {
          expect(button.style.background).toEqual('rgba(0, 0, 0, 0)');
        });
        expect(cruiserButton.style.background).toContain(
          'highlighted-cruiser.png',
        );

        await user.click(square67);
        await user.click(square68);

        expect(square67.style.background).toContain('cruiser-0-right.png');
        expect(square68.style.background).toContain('cruiser-1-right.png');

        await user.click(destroyerButton);
        await user.click(square23);
        await user.click(square25);

        expect(square23.style.background).toContain('destroyer-0-right.png');
        expect(square24.style.background).toContain('destroyer-1-right.png');
        expect(square25.style.background).toContain('destroyer-2-right.png');
      });

      test('double click will do nothing if no ship is placed on the square', async () => {
        const user = userEvent.setup();

        render(component);

        const carrierButton = screen.getByTestId('cruiser');
        const square32 = screen.getByTestId('32');
        const square33 = screen.getByTestId('33');
        const square31 = screen.getByTestId('31');
        const square42 = screen.getByTestId('42');
        const square22 = screen.getByTestId('22');
        const square99 = screen.getByTestId('99');

        await user.click(carrierButton);
        await user.click(square32);
        await user.dblClick(square99);

        expect(square33.style.background).toContain('cruiser-1-right.png');
        expect(square31.style.background).toContain('cruiser-1-left.png');
        expect(square42.style.background).toContain('cruiser-1-down.png');
        expect(square22.style.background).toContain('cruiser-1-up.png');
      });
    });

    describe('ai', () => {
      it('can place all ships', async () => {
        const user = userEvent.setup();

        render(component);

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });

        const destroyer = screen.getByTestId('destroyer');
        await user.click(destroyer);

        const button45 = within(playerBoard).getByTestId('45');
        await user.hover(button45);
        await user.click(button45);
        await user.unhover(button45);

        const button46 = within(playerBoard).getByTestId('46');
        await user.hover(button46);
        await user.unhover(button46);

        const button47 = within(playerBoard).getByTestId('47');
        await user.hover(button47);
        await user.click(button47);
        await user.unhover(button47);

        const carrier = screen.getByTestId('carrier');
        await user.click(carrier);

        const button55 = within(playerBoard).getByTestId('55');
        await user.hover(button55);
        await user.click(button55);
        await user.unhover(button55);

        const button56 = within(playerBoard).getByTestId('56');
        await user.hover(button56);
        await user.unhover(button56);

        const button57 = within(playerBoard).getByTestId('57');
        await user.hover(button57);
        await user.unhover(button57);

        const button58 = within(playerBoard).getByTestId('58');
        await user.hover(button58);
        await user.unhover(button58);

        const button59 = within(playerBoard).getByTestId('59');
        await user.hover(button59);
        await user.click(button59);
        await user.unhover(button59);

        const battleship = screen.getByTestId('battleship');
        await user.click(battleship);

        const button0 = within(playerBoard).getByTestId('0');
        await user.hover(button0);
        await user.click(button0);
        await user.unhover(button0);

        const button10 = within(playerBoard).getByTestId('10');
        await user.hover(button10);
        await user.unhover(button10);

        const button20 = within(playerBoard).getByTestId('20');
        await user.hover(button20);
        await user.unhover(button20);

        const button30 = within(playerBoard).getByTestId('30');
        await user.hover(button30);
        await user.click(button30);
        await user.unhover(button30);

        const submarine = screen.getByTestId('submarine');
        await user.click(submarine);

        const button99 = within(playerBoard).getByTestId('99');
        await user.hover(button99);
        await user.click(button99);
        await user.unhover(button99);

        const button89 = within(playerBoard).getByTestId('89');
        await user.hover(button89);
        await user.unhover(button89);

        const button79 = within(playerBoard).getByTestId('79');
        await user.hover(button79);
        await user.click(button79);
        await user.unhover(button79);

        const cruiser = screen.getByTestId('cruiser');
        await user.click(cruiser);

        const button9 = within(playerBoard).getByTestId('9');
        await user.hover(button9);
        await user.click(button9);
        await user.unhover(button9);

        const button8 = within(playerBoard).getByTestId('8');
        await user.hover(button8);
        await user.click(button8);
        await user.unhover(button8);

        expect(player2.props.allShipsPlaced).toBe(true);
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
        await user.click(destroyer);

        const button45 = within(playerBoard).getByTestId('45');
        await user.hover(button45);
        await user.click(button45);
        await user.unhover(button45);

        const button46 = within(playerBoard).getByTestId('46');
        await user.hover(button46);
        await user.unhover(button46);

        const button47 = within(playerBoard).getByTestId('47');
        await user.hover(button47);
        await user.click(button47);
        await user.unhover(button47);

        const carrier = screen.getByTestId('carrier');
        await user.click(carrier);

        const button55 = within(playerBoard).getByTestId('55');
        await user.hover(button55);
        await user.click(button55);
        await user.unhover(button55);

        const button56 = within(playerBoard).getByTestId('56');
        await user.hover(button56);
        await user.unhover(button56);

        const button57 = within(playerBoard).getByTestId('57');
        await user.hover(button57);
        await user.unhover(button57);

        const button58 = within(playerBoard).getByTestId('58');
        await user.hover(button58);
        await user.unhover(button58);

        const button59 = within(playerBoard).getByTestId('59');
        await user.hover(button59);
        await user.click(button59);
        await user.unhover(button59);

        const battleship = screen.getByTestId('battleship');
        await user.click(battleship);

        const button0 = within(playerBoard).getByTestId('0');
        await user.hover(button0);
        await user.click(button0);
        await user.unhover(button0);

        const button10 = within(playerBoard).getByTestId('10');
        await user.hover(button10);
        await user.unhover(button10);

        const button20 = within(playerBoard).getByTestId('20');
        await user.hover(button20);
        await user.unhover(button20);

        const button30 = within(playerBoard).getByTestId('30');
        await user.hover(button30);
        await user.click(button30);
        await user.unhover(button30);

        const submarine = screen.getByTestId('submarine');
        await user.click(submarine);

        const button99 = within(playerBoard).getByTestId('99');
        await user.hover(button99);
        await user.click(button99);
        await user.unhover(button99);

        const button89 = within(playerBoard).getByTestId('89');
        await user.hover(button89);
        await user.unhover(button89);

        const button79 = within(playerBoard).getByTestId('79');
        await user.hover(button79);
        await user.click(button79);
        await user.unhover(button79);

        const cruiser = screen.getByTestId('cruiser');
        await user.click(cruiser);

        const button9 = within(playerBoard).getByTestId('9');
        await user.hover(button9);
        await user.click(button9);
        await user.unhover(button9);

        const button8 = within(playerBoard).getByTestId('8');
        await user.hover(button8);
        await user.click(button8);
        await user.unhover(button8);

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
        await user.click(destroyer);

        const button45 = within(playerBoard).getByTestId('45');
        await user.click(button45);

        const button47 = within(playerBoard).getByTestId('47');
        await user.click(button47);

        const carrier = screen.getByTestId('carrier');
        await user.click(carrier);

        const button55 = within(playerBoard).getByTestId('55');
        await user.click(button55);

        const button59 = within(playerBoard).getByTestId('59');
        await user.click(button59);

        const battleship = screen.getByTestId('battleship');
        await user.click(battleship);

        const button0 = within(playerBoard).getByTestId('0');
        await user.click(button0);

        const button30 = within(playerBoard).getByTestId('30');
        await user.click(button30);

        const submarine = screen.getByTestId('submarine');
        await user.click(submarine);

        const button99 = within(playerBoard).getByTestId('99');
        await user.click(button99);

        const button79 = within(playerBoard).getByTestId('79');
        await user.click(button79);

        const cruiser = screen.getByTestId('cruiser');
        await user.click(cruiser);

        const button9 = within(playerBoard).getByTestId('9');
        await user.click(button9);

        const button8 = within(playerBoard).getByTestId('8');
        await user.click(button8);

        const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
        const aiBoardButtons = within(aiBoard).getAllByRole('button', {
          name: '',
        });

        aiBoardButtons.forEach((button) => {
          const buttonStyle = getComputedStyle(button);
          expect(buttonStyle.background).toEqual('rgba(0, 0, 0, 0)');
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
        await user.click(destroyer);

        const button45 = within(playerBoard).getByTestId('45');
        await user.hover(button45);
        await user.click(button45);
        await user.unhover(button45);

        const button46 = within(playerBoard).getByTestId('46');
        await user.hover(button46);
        await user.unhover(button46);

        const button47 = within(playerBoard).getByTestId('47');
        await user.hover(button47);
        await user.click(button47);
        await user.unhover(button47);

        const carrier = screen.getByTestId('carrier');
        await user.click(carrier);

        const button55 = within(playerBoard).getByTestId('55');
        await user.hover(button55);
        await user.click(button55);
        await user.unhover(button55);

        const button56 = within(playerBoard).getByTestId('56');
        await user.hover(button56);
        await user.unhover(button56);

        const button57 = within(playerBoard).getByTestId('57');
        await user.hover(button57);
        await user.unhover(button57);

        const button58 = within(playerBoard).getByTestId('58');
        await user.hover(button58);
        await user.unhover(button58);

        const button59 = within(playerBoard).getByTestId('59');
        await user.hover(button59);
        await user.click(button59);
        await user.unhover(button59);

        const battleship = screen.getByTestId('battleship');
        await user.click(battleship);

        const button0 = within(playerBoard).getByTestId('0');
        await user.hover(button0);
        await user.click(button0);
        await user.unhover(button0);

        const button10 = within(playerBoard).getByTestId('10');
        await user.hover(button10);
        await user.unhover(button10);

        const button20 = within(playerBoard).getByTestId('20');
        await user.hover(button20);
        await user.unhover(button20);

        const button30 = within(playerBoard).getByTestId('30');
        await user.hover(button30);
        await user.click(button30);
        await user.unhover(button30);

        const submarine = screen.getByTestId('submarine');
        await user.click(submarine);

        const button99 = within(playerBoard).getByTestId('99');
        await user.hover(button99);
        await user.click(button99);
        await user.unhover(button99);

        const button89 = within(playerBoard).getByTestId('89');
        await user.hover(button89);
        await user.unhover(button89);

        const button79 = within(playerBoard).getByTestId('79');
        await user.hover(button79);
        await user.click(button79);
        await user.unhover(button79);

        const cruiser = screen.getByTestId('cruiser');
        await user.click(cruiser);

        const button9 = within(playerBoard).getByTestId('9');
        await user.hover(button9);
        await user.click(button9);
        await user.unhover(button9);

        const button8 = within(playerBoard).getByTestId('8');
        await user.hover(button8);
        await user.click(button8);
        await user.unhover(button8);

        const noShipContainer = screen.queryByRole('region', {
          name: 'The ship buttons',
        });

        expect(noShipContainer).not.toBeInTheDocument();
      });
    });

    describe('user input', () => {
      //! change assertion test dom
      test('verify the player can attack', async () => {
        const user = userEvent.setup();

        render(component);

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });

        const destroyer = screen.getByTestId('destroyer');
        await user.click(destroyer);

        const button45 = within(playerBoard).getByTestId('45');
        await user.hover(button45);
        await user.click(button45);
        await user.unhover(button45);

        const button46 = within(playerBoard).getByTestId('46');
        await user.hover(button46);
        await user.unhover(button46);

        const button47 = within(playerBoard).getByTestId('47');
        await user.hover(button47);
        await user.click(button47);
        await user.unhover(button47);

        const carrier = screen.getByTestId('carrier');
        await user.click(carrier);

        const button55 = within(playerBoard).getByTestId('55');
        await user.hover(button55);
        await user.click(button55);
        await user.unhover(button55);

        const button56 = within(playerBoard).getByTestId('56');
        await user.hover(button56);
        await user.unhover(button56);

        const button57 = within(playerBoard).getByTestId('57');
        await user.hover(button57);
        await user.unhover(button57);

        const button58 = within(playerBoard).getByTestId('58');
        await user.hover(button58);
        await user.unhover(button58);

        const button59 = within(playerBoard).getByTestId('59');
        await user.hover(button59);
        await user.click(button59);
        await user.unhover(button59);

        const battleship = screen.getByTestId('battleship');
        await user.click(battleship);

        const button0 = within(playerBoard).getByTestId('0');
        await user.hover(button0);
        await user.click(button0);
        await user.unhover(button0);

        const button10 = within(playerBoard).getByTestId('10');
        await user.hover(button10);
        await user.unhover(button10);

        const button20 = within(playerBoard).getByTestId('20');
        await user.hover(button20);
        await user.unhover(button20);

        const button30 = within(playerBoard).getByTestId('30');
        await user.hover(button30);
        await user.click(button30);
        await user.unhover(button30);

        const submarine = screen.getByTestId('submarine');
        await user.click(submarine);

        const button99 = within(playerBoard).getByTestId('99');
        await user.hover(button99);
        await user.click(button99);
        await user.unhover(button99);

        const button89 = within(playerBoard).getByTestId('89');
        await user.hover(button89);
        await user.unhover(button89);

        const button79 = within(playerBoard).getByTestId('79');
        await user.hover(button79);
        await user.click(button79);
        await user.unhover(button79);

        const cruiser = screen.getByTestId('cruiser');
        await user.click(cruiser);

        const button9 = within(playerBoard).getByTestId('9');
        await user.hover(button9);
        await user.click(button9);
        await user.unhover(button9);

        const button8 = within(playerBoard).getByTestId('8');
        await user.hover(button8);
        await user.click(button8);
        await user.unhover(button8);

        const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
        const button23 = within(aiBoard).getByTestId('23');
        await user.click(button23);

        expect(player2.board[23].isHit || player2.board[23].isMiss).toBe(true);
      });

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
        const button23Style = getComputedStyle(button23);

        expect(button23Style.background).toContain('url("hit.png")');
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
        const button23Style = getComputedStyle(button23);

        expect(button23Style.background).toContain('url("miss.png")');
      });

      test('a sunk ship will render on ai game board', async () => {
        const user = userEvent.setup();
        const square45BGRight = 'cruiser-0-right-sunk.png';
        const square46BGRight = 'cruiser-1-right-sunk.png';
        player2.board[45].ship = player2.props.allShips[4];
        player2.board[45].imageDirection = 'right';
        player2.board[45].imageNumber = 0;
        player2.board[46].ship = player2.props.allShips[4];
        player2.board[46].imageDirection = 'right';
        player2.board[46].imageNumber = 1;
        player2.props.allShips[0].props.isPlaced = true;
        player2.props.allShips[1].props.isPlaced = true;
        player2.props.allShips[2].props.isPlaced = true;
        player2.props.allShips[3].props.isPlaced = true;
        player2.props.allShips[4].props.isPlaced = true;
        player1.props.allShips[0].props.isPlaced = true;
        player1.props.allShips[1].props.isPlaced = true;
        player1.props.allShips[2].props.isPlaced = true;
        player1.props.allShips[3].props.isPlaced = true;

        render(component);

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });

        const cruiser = screen.getByTestId('cruiser');
        await user.click(cruiser);

        const button45 = within(playerBoard).getByTestId('45');
        await user.click(button45);

        const button46 = within(playerBoard).getByTestId('46');
        await user.click(button46);

        const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
        const aiBoardButton45 = within(aiBoard).getByTestId('45');
        const aiBoardButton46 = within(aiBoard).getByTestId('46');

        await user.click(aiBoardButton45);

        let aiBoardButtonStyle = getComputedStyle(aiBoardButton45);

        expect(aiBoardButtonStyle.background).toContain('hit.png');

        await user.click(aiBoardButton46);

        aiBoardButtonStyle = getComputedStyle(aiBoardButton46);

        expect(aiBoardButtonStyle.background).toContain(square46BGRight);

        aiBoardButtonStyle = getComputedStyle(aiBoardButton45);

        expect(aiBoardButtonStyle.background).toContain(square45BGRight);
      });
    });

    describe('ai', () => {
      test('verify ai can attack', async () => {
        const user = userEvent.setup();

        render(component);

        const playerBoard = screen.getByRole('region', {
          name: 'The Game Board',
        });

        const destroyer = screen.getByTestId('destroyer');
        await user.click(destroyer);

        const button45 = within(playerBoard).getByTestId('45');
        await user.hover(button45);
        await user.click(button45);
        await user.unhover(button45);

        const button46 = within(playerBoard).getByTestId('46');
        await user.hover(button46);
        await user.unhover(button46);

        const button47 = within(playerBoard).getByTestId('47');
        await user.hover(button47);
        await user.click(button47);
        await user.unhover(button47);

        const carrier = screen.getByTestId('carrier');
        await user.click(carrier);

        const button55 = within(playerBoard).getByTestId('55');
        await user.hover(button55);
        await user.click(button55);
        await user.unhover(button55);

        const button56 = within(playerBoard).getByTestId('56');
        await user.hover(button56);
        await user.unhover(button56);

        const button57 = within(playerBoard).getByTestId('57');
        await user.hover(button57);
        await user.unhover(button57);

        const button58 = within(playerBoard).getByTestId('58');
        await user.hover(button58);
        await user.unhover(button58);

        const button59 = within(playerBoard).getByTestId('59');
        await user.hover(button59);
        await user.click(button59);
        await user.unhover(button59);

        const battleship = screen.getByTestId('battleship');
        await user.click(battleship);

        const button0 = within(playerBoard).getByTestId('0');
        await user.hover(button0);
        await user.click(button0);
        await user.unhover(button0);

        const button10 = within(playerBoard).getByTestId('10');
        await user.hover(button10);
        await user.unhover(button10);

        const button20 = within(playerBoard).getByTestId('20');
        await user.hover(button20);
        await user.unhover(button20);

        const button30 = within(playerBoard).getByTestId('30');
        await user.hover(button30);
        await user.click(button30);
        await user.unhover(button30);

        const submarine = screen.getByTestId('submarine');
        await user.click(submarine);

        const button99 = within(playerBoard).getByTestId('99');
        await user.hover(button99);
        await user.click(button99);
        await user.unhover(button99);

        const button89 = within(playerBoard).getByTestId('89');
        await user.hover(button89);
        await user.unhover(button89);

        const button79 = within(playerBoard).getByTestId('79');
        await user.hover(button79);
        await user.click(button79);
        await user.unhover(button79);

        const cruiser = screen.getByTestId('cruiser');
        await user.click(cruiser);

        const button9 = within(playerBoard).getByTestId('9');
        await user.hover(button9);
        await user.click(button9);
        await user.unhover(button9);

        const button8 = within(playerBoard).getByTestId('8');
        await user.hover(button8);
        await user.click(button8);
        await user.unhover(button8);

        const aiBoard = screen.getByRole('region', { name: 'Ai Game Board' });
        const button23 = within(aiBoard).getByTestId('23');
        await user.click(button23);

        const boardButtons = within(playerBoard).getAllByRole('button', {
          name: '',
        });
        const found = boardButtons.some((button) => {
          const style = getComputedStyle(button);
          return (
            style.background.includes('hit.png') ||
            style.background.includes('miss.png')
          );
        });
        expect(found).toBe(true);
      });

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
          const buttonStyle = getComputedStyle(button);
          return buttonStyle.background.includes('hit.png');
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
          const buttonStyle = getComputedStyle(button);
          return buttonStyle.background.includes('miss.png');
        });

        expect(foundMiss).toBe(true);
      });

      test('a sunk ship will render on user game board', async () => {
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
        const user = userEvent.setup();

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
        const aiButton53 = within(aiBoard).getByTestId('53');

        await user.click(aiButton54);
        await user.click(aiButton53);

        const playerBoard45 = within(playerBoard).getByTestId('45');
        const playerBoard45Style = getComputedStyle(playerBoard45);
        const playerBoard46 = within(playerBoard).getByTestId('46');
        const playerBoard46Style = getComputedStyle(playerBoard46);

        expect(playerBoard45Style.background).toContain(
          'cruiser-0-right-sunk.png',
        );

        expect(playerBoard46Style.background).toContain(
          'cruiser-1-right-sunk.png',
        );
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
            const buttonStyle = getComputedStyle(button);
            expect(buttonStyle.background).toEqual('rgba(0, 0, 0, 0)');
          });
        });
      });
    });
  });
});
