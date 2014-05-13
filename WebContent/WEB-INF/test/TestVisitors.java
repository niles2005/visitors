import java.awt.AWTEvent;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowEvent;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.UIManager;

/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) 2005</p>
 * <p>Company: </p>
 * @author niles2010@live.cn
 * @version 1.0
 */

public class TestVisitors extends JFrame {
    private static boolean packFrame = false;

    public static void main(String[] args) {
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    	TestVisitors frame = new TestVisitors();
        //Validate frames that have preset sizes
        //Pack frames that have useful preferred size info, e.g. from their layout
        if (packFrame) {
            frame.pack();
        }
        else {
            frame.validate();
        }
        //Center the window
        Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
        Dimension frameSize = frame.getSize();
        if (frameSize.height > screenSize.height) {
            frameSize.height = screenSize.height;
        }
        if (frameSize.width > screenSize.width) {
            frameSize.width = screenSize.width;
        }
        frame.setLocation((screenSize.width - frameSize.width) / 2, (screenSize.height - frameSize.height) / 2);
        frame.setVisible(true);
    }
	
    private JPanel contentPane;
    private BorderLayout borderLayout1 = new BorderLayout();
    //Construct the frame
    public TestVisitors() {
        enableEvents(AWTEvent.WINDOW_EVENT_MASK);
        try {
            jbInit();
        }
        catch(Exception e) {
            e.printStackTrace();
        }
    }
    //Component initialization
    private void jbInit() throws Exception  {
        //setIconImage(Toolkit.getDefaultToolkit().createImage(Frame2.class.getResource("[Your Icon]")));
        contentPane = (JPanel) this.getContentPane();
        contentPane.setLayout(borderLayout1);
        this.setBackground(Color.white);
        this.setSize(new Dimension(800, 600));
        this.setTitle("Visitors Tester");
        contentPane.add(m_panel,BorderLayout.CENTER);
    }
    
    private TestPanel m_panel = new TestPanel();
    //Overridden so we can exit when window is closed
    protected void processWindowEvent(WindowEvent e) {
        super.processWindowEvent(e);
        if (e.getID() == WindowEvent.WINDOW_CLOSING) {
            System.exit(0);
        } else if(e.getID() == WindowEvent.WINDOW_ACTIVATED) {
        	this.repaint();
        }
    }
    
    
    
}

class TestPanel extends JPanel {
	private String[] cardNames = new String[31];
	JCheckBox printSql = new JCheckBox("printSql"); 
	
//	JTextField driverField = new JTextField("com.microsoft.sqlserver.jdbc.SQLServerDriver");
//	JTextField urlField = new JTextField("jdbc:sqlserver://192.168.3.214:1433;databaseName=InesaztTest");
//	JTextField userField = new JTextField("sa");
//	JTextField passField = new JTextField("inesazt2013");
	
	JTextField driverField = new JTextField("org.sqlite.JDBC");
	JTextField urlField = new JTextField("jdbc:sqlite:E:\\Project\\visitors\\tomcat\\test\\test.db");
	JTextField userField = new JTextField("");
	JTextField passField = new JTextField("");
	
//	JTextField driverField = new JTextField("oracle.jdbc.driver.OracleDriver");
//	JTextField urlField = new JTextField("jdbc:oracle:thin:@192.168.5.203:1521:UNPAY");
//	JTextField userField = new JTextField("gis");
//	JTextField passField = new JTextField("gis");

	public TestPanel() {
		setLayout(new BorderLayout());
		JPanel upPanel = new JPanel();
		
		upPanel.add(printSql);
		
		upPanel.add(new JLabel("Driver:"));
		driverField.setPreferredSize(new Dimension(200,20));

		upPanel.add(driverField);
		upPanel.add(new JLabel("URL:"));
		urlField.setPreferredSize(new Dimension(200,20));
		upPanel.add(urlField);

		upPanel.add(userField);
		upPanel.add(new JLabel("User:"));
		userField.setPreferredSize(new Dimension(40,20));
		upPanel.add(userField);

		upPanel.add(passField);
		upPanel.add(new JLabel("Pass:"));
		passField.setPreferredSize(new Dimension(40,20));
		upPanel.add(passField);
		
		this.add(upPanel,BorderLayout.NORTH);
		
		JPanel centerPanel = new JPanel();
		this.add(centerPanel,BorderLayout.CENTER);
		
		Integer index = 1;
		while(index <= 30){
			String sNum = index.toString();
			if(index < 10){
				sNum = "0" + sNum;
			}
			String sName = "r00" + sNum;
			cardNames[index] = sName;
			index ++;
		}
		centerPanel.setLayout(new GridLayout(cardNames.length,5));
		for(int i=0;i<cardNames.length;i++) {
			String cardName = cardNames[i];
			new Card(cardName,this,centerPanel);
		}
    }
    private static DateFormat DateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss.SSS");

	public void doCard(Card card) {
		System.err.println(card.getName() + " -> " + card.getLocation());
		Connection conn = null;  
		try {
			String strDriver = driverField.getText().trim();
			Class.forName(strDriver);
			conn = DriverManager.getConnection(urlField.getText().trim(),userField.getText().trim(),passField.getText().trim());
			Statement stmt = conn.createStatement();  
			String dateTime = DateFormat.format(new Date());
			int pos = dateTime.indexOf(" ");
			String strDate = null;
			String strTime = null;
			if(pos != -1) {
				strDate = dateTime.substring(0,pos);
				strTime = dateTime.substring(pos + 1);
			}
			
			String sql = null;
			if(strDriver.indexOf("OracleDriver") != -1) {
				sql = "insert into cardpositiontrans(card_id,reader_name,ant_id,up_date,up_time,mac_address,trans_seq) values('" + card.getName() + "','RFID Reader','0','" + strDate + "','" + strTime + "','" + card.getLocation() + "',SEQ_CARDTRANS.NEXTVAL)";
			} else {
				sql = "insert into cardpositiontrans(card_id,reader_name,ant_id,up_date,up_time,mac_address) values('" + card.getName() + "','RFID Reader','0','" + strDate + "','" + strTime + "','" + card.getLocation() + "')";
			}
			if(this.printSql.isSelected()) {
				System.err.println(sql);
			}
			stmt.execute(sql);

            stmt.close();  
            conn.close();  			
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
class Card {
	public static String[] locations = new String[]{"building1","building2","factory","outside"};
	private String m_name = null;
	private TestPanel m_panel = null;
	private JButton m_selectButon = null;
	
	public Card(String name,TestPanel panel,JPanel wrapPanel) {
		m_name = name;
		m_panel = panel;
		
		JButton mainButton = new JButton(m_name);
		mainButton.setEnabled(false);
		wrapPanel.add(mainButton);
        for(int i=0;i<locations.length;i++) {
        	JButton btn = new JButton(locations[i]);
        	wrapPanel.add(btn);
        	btn.addActionListener(new ActionListener() {
        		public void actionPerformed(ActionEvent arg0) {
        			JButton sourceBtn = (JButton)arg0.getSource();
        			selectButton(sourceBtn);
        		}
        	});
        }
	}
	
	public String getName() {
		return m_name;
	}
	
	public String getLocation() {
		return m_selectButon.getText();
	}
	
	private void selectButton(JButton button) {
		if(m_selectButon != null) {
			m_selectButon.setBorderPainted(false);
			m_selectButon.setEnabled(true);
			m_selectButon.setForeground(button.getForeground());
		}
		m_selectButon = button;
		m_selectButon.setForeground(Color.red);
		m_selectButon.setBorderPainted(true);
		m_selectButon.setEnabled(false);
		m_panel.doCard(this);
	}
}
