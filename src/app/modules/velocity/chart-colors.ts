export class ChartColors {
  public assigned = '#007d8b';
  public awaiting = '#3f3f3f72';
  public inProgress = '#ffea03a8';
  public blocked = '#88000080';
  public awaitingQA = '#ffa51dcb';
  public awaitingPR = '#80008084';
  public ready = '#90ee9056';
  public inProduction = '#da70d680';
  public complete = '#1d8f10';

  hoverColors = {
    assigned: '#00c9df',
    awaiting: '#3f3f3f',
    inProgress: '#ffea03',
    blocked: '#ff0000',
    awaitingQA: '#ffa51d',
    awaitingPR: '#800080',
    ready: '#90ee90',
    inProduction: '#da70d6',
    complete: '#16c702',
  };

  borderColors = {
    assigned: '#007d8b',
    awaiting: 'grey',
    inProgress: '#ffea0787',
    blocked: '#ff0000',
    awaitingQA: '#ff9c0787',
    awaitingPR: 'purple',
    ready: 'lightgreen',
    inProduction: 'teal',
    complete: '#01b63489',
  };
}
