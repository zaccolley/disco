import java.util.ArrayList;

public class Club
{
    private ArrayList<Membership> members;
    
    /**
     * Constructor for objects of class Club
     */
    public Club()
    {
        members = new ArrayList<Membership>();        
    }

    /**
     * Add a new member to the club's list of members.
     * @param member The member object to be added.
     */
    public void join(Membership member)
    {
        members.add(member);
    }
    
    public int joinedMonth(int month){
        int membersInMonth = 0;
        for(Membership member : members){
            if (member.getMonth() == month){
            membersInMonth++;
            }
        }
        return membersInMonth;
    }

    /**
     * @return The number of members (Membership objects) in
     *         the club.
     */
    
    public int numberOfMembers()
    {
        return members.size();
    }
    
    public ArrayList purge(int month, int year){
        ArrayList<Membership> purged;
        purged = new ArrayList<Membership>();
         for(Membership member : members){
            if (member.getMonth() == month && member.getYear() == year){
                purged.add(member);
                members.remove(member);
            }
        }
        return purged;
    }
}
