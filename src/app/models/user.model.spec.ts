import { User } from './user.model';

describe('User', () => {
    let user:User
  it('should create an instance', () => {
    expect(new User('test@email.com','10','test','demo')).toBeTruthy();
  });


});
