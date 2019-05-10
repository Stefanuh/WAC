package nl.hu.v1wac.firstapp.webservices;

import java.util.List;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import nl.hu.v1wac.firstapp.model.Country;
import nl.hu.v1wac.firstapp.model.ServiceProvider;
import nl.hu.v1wac.firstapp.model.WorldService;

@Path("/countries")
public class WorldResource {

  @GET
  @Produces("application/json")
  public String getOrders() {
	WorldService service = ServiceProvider.getWorldService();
    JsonArrayBuilder jab = Json.createArrayBuilder();
    for (Country o : service.getWorldService()) {
	  JsonObjectBuilder job = Json.createObjectBuilder();
	  job.add("code", o.getCode());
	  job.add("iso3", o.getIso3());
	  job.add("name", o.getName());
	  job.add("capital", o.getCapital());
	  job.add("continent", o.getContinent());
	  job.add("region", o.getRegion());
	  job.add("surface", o.getSurface());
	  job.add("population", o.getPopulation());
	  job.add("government", o.getGovernment());
	  job.add("latitude", o.getLatitude());
	  job.add("longitude", o.getLongitude());
	  jab.add(job);
    }
    JsonArray array = jab.build();
    return array.toString();
  }

  @GET
  @Path("{code}")
  @Produces("application/json")
  public String getOrderInfo(@PathParam("code") String id) {
	WorldService service = ServiceProvider.getWorldService();
	Country c = service.getCountryByCode(id);
	JsonObjectBuilder job = Json.createObjectBuilder();
	job.add("id", c.getCode());
	job.add("name", c.getName());
	return job.build().toString();
  }
  
  @GET
  @Path("/largestsurfaces")
  @Produces("application/json")
  public String getLargestSurfaces() {
	  WorldService service = ServiceProvider.getWorldService();
	    JsonArrayBuilder jab = Json.createArrayBuilder();
	    
	    for (Country o : service.get10LargestSurfaces()) {
		  JsonObjectBuilder job = Json.createObjectBuilder();
		  job.add("code", o.getCode());
		  job.add("iso3", o.getIso3());
		  job.add("name", o.getName());
		  job.add("capital", o.getCapital());
		  job.add("continent", o.getContinent());
		  job.add("region", o.getRegion());
		  job.add("surface", o.getSurface());
		  job.add("population", o.getPopulation());
		  job.add("government", o.getGovernment());
		  job.add("latitude", o.getLatitude());
		  job.add("longitude", o.getLongitude());
		  jab.add(job);
	    }
	    JsonArray array = jab.build();
	    return array.toString();
 }
 
  @GET
  @Path("/largestpopulations")
  @Produces("application/json")
  public String getLargestPopulations() {
	  WorldService service = ServiceProvider.getWorldService();
	    JsonArrayBuilder jab = Json.createArrayBuilder();
	    
	    for (Country o : service.get10LargestPopulations()) {
		  JsonObjectBuilder job = Json.createObjectBuilder();
		  job.add("code", o.getCode());
		  job.add("iso3", o.getIso3());
		  job.add("name", o.getName());
		  job.add("capital", o.getCapital());
		  job.add("continent", o.getContinent());
		  job.add("region", o.getRegion());
		  job.add("surface", o.getSurface());
		  job.add("population", o.getPopulation());
		  job.add("government", o.getGovernment());
		  job.add("latitude", o.getLatitude());
		  job.add("longitude", o.getLongitude());
		  jab.add(job);
	    }
	    JsonArray array = jab.build();
	    return array.toString();
  }
  
  
}
