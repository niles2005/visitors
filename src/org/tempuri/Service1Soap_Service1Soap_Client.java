
package org.tempuri;

/**
 * Please modify this class to meet your needs
 * This class is not complete
 */

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.MalformedURLException;
import java.net.URL;

import javax.xml.namespace.QName;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.inesazt.visitors.ServerConfig;
import com.inesazt.visitors.manager.cfg.Config;
import com.inesazt.visitors.util.MyLogUtil;

/**
 * This class was generated by Apache CXF 2.7.5
 * 2014-01-06T13:27:10.999+08:00
 * Generated source version: 2.7.5
 * 
 */
public final class Service1Soap_Service1Soap_Client {

    private static final QName SERVICE_NAME = new QName("http://tempuri.org/", "Service1");
    
    private static Log log = LogFactory.getLog(Service1Soap_Service1Soap_Client.class);

    public Service1Soap_Service1Soap_Client() {
    }
    
    public String getGuestList(String code){

    	try{
    		//是否是测试环境
    		if(Config.getInstance().getISTEST()){
				System.out.println(code + ",Invoking getSpasVisitingGuestList...");
				ServerConfig cfg = ServerConfig.getInstance();
				String cfgPath = cfg.getConfigPath().getAbsolutePath();
				File file = new File(cfgPath + "\\sandisk-result-string\\" + code + "_return_string.txt");
				BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
				StringBuffer sb = new StringBuffer();
				sb.append(reader.readLine());
				return sb.toString();      			
    		}else{//生产环境
				URL wsdlURL = Service1.WSDL_LOCATION;
				Service1 ss = new Service1(wsdlURL, SERVICE_NAME);
				Service1Soap port = ss.getService1Soap();  
    			java.lang.String _getSpasVisitingGuestList_escort = code;
				System.out.println( _getSpasVisitingGuestList_escort + ",Invoking getSpasVisitingGuestList...");
				java.lang.String _getSpasVisitingGuestList__return = port.getSpasVisitingGuestList(_getSpasVisitingGuestList_escort);
				return _getSpasVisitingGuestList__return;    	    			
    		}
    	}catch(Exception e){
    		log.error(MyLogUtil.getExceptionStr(e));
			throw new RuntimeException(e);
    	}

    }

    public static void main(String args[]) throws java.lang.Exception {
        URL wsdlURL = Service1.WSDL_LOCATION;
        if (args.length > 0 && args[0] != null && !"".equals(args[0])) { 
            File wsdlFile = new File(args[0]);
            try {
                if (wsdlFile.exists()) {
                    wsdlURL = wsdlFile.toURI().toURL();
                } else {
                    wsdlURL = new URL(args[0]);
                }
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
        }
      
        Service1 ss = new Service1(wsdlURL, SERVICE_NAME);
        Service1Soap port = ss.getService1Soap();  
        
       
        {
        	String[] codes = {"ds006", "12225", "2798", "XR014", "XR012", "16985", "5471", "4251", "21558", "4242", "15849", "17632"};
        	for(String code : codes){
	            System.out.println(code + ",Invoking getSpasVisitingGuestList...");
	            java.lang.String _getSpasVisitingGuestList__return = port.getSpasVisitingGuestList(code);
	            File file = new File("d:\\sandisk-result-string\\" + code + "_return_string.txt");
				file.createNewFile();
				OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream("d:\\sandisk-result-string\\" + code + "_return_string.txt"),"UTF-8");
				out.write(_getSpasVisitingGuestList__return);
				out.flush();
				System.out.println(code + ",Invoking Success!");	
        	}
        }

        System.exit(0);
    }

}