export default class StackHelper {
  // eslint-disable-next-line
  private stack: any = [];

  public raw() {
    return [...this.stack];
  }

  // eslint-disable-next-line
  public push(data: any) {
    return this.stack.push(data);
  }

  public pop() {
    return this.stack.pop();
  }

  public peek() {
    return this.stack[this.size() - 1];
  }

  public size() {
    return this.stack.length;
  }
}