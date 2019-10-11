import React from 'react';
import storedState from './stored_state';
import './Forms.css';

const { getStoredState, storeState } = storedState('Forms');

const SAVED_KEYS = ['token', 'workspaceId', 'projectId', 'hours'];

export default class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: getStoredState('token', ''),
      workspaceId: getStoredState('workspaceId', ''),
      projectId: getStoredState('projectId', ''),
      hours: getStoredState('hours', 34),
      period: '0',
      settingsOpen: false
    };
  }

  componentDidMount() {
    this.emitOnUpdate(this.state);
  }

  setFormState(data) {
    this.setState(state => {
      Object.keys(data).filter(it => SAVED_KEYS.includes(it)).forEach(key => storeState(key, data[key]));
      this.emitOnUpdate({...state, ...data});
      return data;
    });
  }

  emitOnUpdate(state) {
    const { token, workspaceId, projectId, hours, period } = state;
    this.props.onUpdate({ token, workspaceId, projectId, hours, period });
  }

  render() {
    const months = Array.from({ length: 13 }, (_, i) => (12 - i).toString());
    const { token, workspaceId, projectId, hours, period, settingsOpen } = this.state;
    return (
      <div className="Forms m-3">
        <div className="form-group">
          <label htmlFor="form_period">Período</label>
          <select className="custom-select" value={period} onChange={event => this.setFormState({period: event.target.value})}>
            {months.map(offset => (
              <option value={offset} key={offset}>{offset}</option>
            ))}
          </select>
        </div>
        <div className="card">
          <div className="card-header">
            <h2 className="mb-0">
              <button className="btn btn-link" type="button" onClick={() => this.setState({settingsOpen: !settingsOpen})}>
                Opções
              </button>
            </h2>
          </div>
          <div className={`collapse ${settingsOpen ? 'show' : ''}`}>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="form_hours">Horas</label>
                <input className="form-control" id="form_hours" type="number" min={1} value={hours} onChange={event => this.setFormState({hours: event.target.value})} />
              </div>

              <div className="form-group">
                <label htmlFor="form_token">Token</label>
                <input className="form-control" id="form_token" type="text" value={token} onChange={event => this.setFormState({token: event.target.value})} />
              </div>

              <div className="form-group">
                <label htmlFor="form_workspace">Workspace ID</label>
                <input className="form-control" id="form_workspace" type="text" value={workspaceId} onChange={event => this.setFormState({workspaceId: event.target.value})} />
              </div>

              <div className="form-group">
                <label htmlFor="form_project">Project ID</label>
                <input className="form-control" id="form_project" type="text" value={projectId} onChange={event => this.setFormState({projectId: event.target.value})} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
