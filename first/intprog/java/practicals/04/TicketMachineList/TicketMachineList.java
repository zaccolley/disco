import java.util.ArrayList;

public class TicketMachineList
{
    private ArrayList<TicketMachine> ticketMachines;
        
    public TicketMachineList()
    {
        ticketMachines = new ArrayList<TicketMachine>();
        
        TicketMachine tM1 = new TicketMachine(50);
        TicketMachine tM2 = new TicketMachine(100);
        TicketMachine tM3 = new TicketMachine(200);
        
        addTicketMachine(tM1);
        addTicketMachine(tM2);
        addTicketMachine(tM3);
    }   
    
    public void addTicketMachine(TicketMachine ticketMachine)
    {
        ticketMachines.add(ticketMachine);
    }    
    
    public int getNumberOfTicketMachines()
    {
        return ticketMachines.size();
    }    
   
    public void listTicketMachine(int index)
    {
        if(index >= 0 && index < ticketMachines.size()) {
            TicketMachine ticketMachine = ticketMachines.get(index);
            System.out.println(ticketMachine);
        }
    }
    
    public void removeTicketMachine(int index)
    {
        if(index >= 0 && index < ticketMachines.size()) {
            ticketMachines.remove(index);
        }
    }
}
