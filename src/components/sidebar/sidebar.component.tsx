import React from 'react';
import { Menu, Segment, Sidebar, Icon, Header } from 'semantic-ui-react';

import { HomePage } from '../../views/home';
import { HeaderComponent } from '../header';
import { AppContext } from '../../App.context';
import { InputComponent } from '../form/input';
import { SlideDownComponent } from '../slide-down';
import { ISidebarComponent } from './sidebar.interfaces';
import { IBoard } from '../../models/models.interfaces';
import { StyledNoBoardSelectedMessage } from './sidebar.styles';

class SidebarComponent extends React.Component<{}, ISidebarComponent> {

  static contextType = AppContext;

  inputRef = React.createRef<HTMLInputElement>();

  constructor(props: any) {
    super(props);

    this.state = {
      newBoard: '',
      showNewBoard: false,
    }
  }

  onChange = (e: any) => {
    this.setState({ newBoard: e.target.value });
  }

  createBoard = (e: any) => {

      e.preventDefault();

      if (this.state.newBoard) {
          this.context.boardService.createBoard({ name: this.state.newBoard })
              .then(() => {
                  this.context.reloadBoards();
                  this.setState({ newBoard: '' });
              });
      }

  }

  manageNewBoard = (show: boolean) => {
    this.setState({ showNewBoard: show });

    if (show && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  toogleCreateUserModal = () => {
    this.context.setShowCreateUserModal((f: boolean) => !f);
    this.context.toogleMenu();
  }

  render() {
      return (

          <Sidebar.Pushable as={Segment}>
              <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                onHide={() => this.context.hideMenu()}
                vertical
                visible={this.context.showMenu}
                width='thin'
              >
                <Menu.Item as='a' onClick={this.context.toogleMenu}>
                  <Icon name="arrow left" size="big" color="grey" />
                </Menu.Item>
                {this.context.boards.map((boardIterate: IBoard) => (
                  <Menu.Item as='a' key={boardIterate._id} onClick={() => this.context.setBoardFunction(boardIterate)}>
                    {boardIterate.name}
                  </Menu.Item>
                ))}
                <SlideDownComponent show={this.state.showNewBoard}>
                  <Menu.Item as='form' onSubmit={this.createBoard}>
                      <InputComponent
                          ref={this.inputRef}
                          value={this.state.newBoard}
                          onChange={this.onChange}
                          onBlur={() => this.manageNewBoard(false)} />
                  </Menu.Item>
                </SlideDownComponent>
                <Menu.Item as='a' onClick={() => this.manageNewBoard(true)}>
                  <Icon name='plus' />
                  Novo quadro
                </Menu.Item>
                <Menu.Item as='a' onClick={this.toogleCreateUserModal}>
                  <Icon name='plus' />
                  Criar usuário
                </Menu.Item>
              </Sidebar>
  
              <Sidebar.Pusher style={{ overflow: this.context.board._id ? 'auto' : 'hidden' }}>
                <HeaderComponent />
                <div className="App">
                  {this.context.board._id
                    ? <HomePage />
                    : <StyledNoBoardSelectedMessage>
                      <Header color='grey' as='h1' style={{ paddingLeft: 20 }}>Abra o menu e escolha um quadro</Header>
                    </StyledNoBoardSelectedMessage>
                  }
                </div>
              </Sidebar.Pusher>
            </Sidebar.Pushable>
      )
  }

}

export default SidebarComponent;
