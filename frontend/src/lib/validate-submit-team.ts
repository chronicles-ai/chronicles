type Params = {
  teamName: string;
  leader: string;
  member1: string;
  member2: string;
  member3: string;
  member4: string;
};

export default function validateSubmitTeam({
  teamName,
  leader,
  member1,
  member2,
  member3,
  member4,
}: Params): string | null {
  if (teamName.trim() === '') {
    return 'Team name cannot be empty';
  }

  if (leader.trim() === '') {
    return 'Leader name cannot be empty';
  }

  if (member1.trim() === '') {
    return 'Member 1 name cannot be empty';
  }

  if (member2.trim() === '') {
    return 'Member 2 name cannot be empty';
  }

  if (member3.trim() === '') {
    return 'Member 3 name cannot be empty';
  }

  if (member4.trim() === '') {
    return 'Member 4 name cannot be empty';
  }

  return null;
}
