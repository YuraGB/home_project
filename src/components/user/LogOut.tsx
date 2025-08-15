import { Button } from '../ui/button';

export const LogOut = ({ logOut }: { logOut: () => void }) => {
  return (
    <Button variant="ghost" onClick={logOut}>
      Log out
    </Button>
  );
};
