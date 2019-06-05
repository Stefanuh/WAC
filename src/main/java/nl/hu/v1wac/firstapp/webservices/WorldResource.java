package nl.hu.v1wac.firstapp.webservices;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.security.RolesAllowed;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import nl.hu.v1wac.firstapp.model.Country;
import nl.hu.v1wac.firstapp.model.ServiceProvider;
import nl.hu.v1wac.firstapp.model.WorldService;

@Path("/countries")
public class WorldResource {
	private WorldService service = ServiceProvider.getWorldService();
	
	@GET
	@Produces("application/json")
	public String getLanden() {
		JsonArrayBuilder jab = Json.createArrayBuilder();

		for (Country c : service.getAllCountries()) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("name", c.getName());
			job.add("code", c.getCode());
			job.add("capital", c.getCapital());
			job.add("government", c.getGovernment());
			job.add("region", c.getRegion());
			job.add("population", c.getPopulation());
			job.add("surface", c.getSurface());
			job.add("continent", c.getContinent());
			job.add("latitude", c.getLatitude());
			job.add("longitude", c.getLongitude());
			jab.add(job);
		}

		JsonArray array = jab.build();
		return array.toString();
	}

	@GET
	@Path("{code}")
	@Produces("application/json")
	public String getLand(@PathParam("code") String code) {
		JsonArrayBuilder jab = Json.createArrayBuilder();

		for (Country c : service.getAllCountries()) {
			if(c.getCode().equals(code)) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("name", c.getName());
			job.add("code", c.getCode());
			job.add("capital", c.getCapital());
			job.add("government", c.getGovernment());
			job.add("region", c.getCapital());
			job.add("population", c.getPopulation());
			job.add("surface", c.getSurface());
			job.add("latitude", c.getLatitude());
			job.add("longitude", c.getLongitude());
			jab.add(job);
			}
		}
		JsonArray array = jab.build();
		return array.toString();
	}

	@GET
	@Path("largestsurfaces")
	@Produces("application/json")
	public String getSurface() {
		JsonArrayBuilder jab = Json.createArrayBuilder();

		for (Country c : service.get10LargestSurfaces()) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("name: ", c.getName());
			job.add("surface:", c.getSurface());
			jab.add(job);

		}

		JsonArray array = jab.build();
		return array.toString();

	}

	@GET
	@Path("largestpopulation")
	@Produces("application/json")
	public String getPopulation() {
		JsonArrayBuilder jab = Json.createArrayBuilder();

		for (Country c : service.get10LargestSurfaces()) {
			JsonObjectBuilder job = Json.createObjectBuilder();
			job.add("name: ", c.getName());
			job.add("surface:", c.getPopulation());
			jab.add(job);

		}

		JsonArray array = jab.build();
		return array.toString();

	}
	
	@PUT
	@RolesAllowed("user")
	@Path("{code}")
	@Produces("application/json")
	public Response updateLand(@PathParam("code")String c,
							   @FormParam("name")String nm,
							   @FormParam("capital") String h,
							   @FormParam("region") String r,
							   @FormParam("surface")double o,
							   @FormParam("population")int i) {
		
		Country land = service.updateLand(c, nm, h, r, o, i);
		
		if (land == null) {
			Map<String, String> messages = new HashMap<String, String>();
		      messages.put("error", "land does not exist!");
		      return Response.status(409).entity(messages).build();
		    }
		return  Response.ok(land).build();
		}
	
	@DELETE
	@RolesAllowed("user")
	@Path("{code}")
	@Produces("application/json")
	public Response deleteCountry(@PathParam("code") String c) {
			
		if (!service.deleteCountry(c)) {
			return Response.status(404).build();
		}
		return Response.ok().build();
	}
	
	@POST
	@RolesAllowed("user")
	@Produces("application/json")
	public Response addCountry(@FormParam("code")String c,
							   @FormParam("country")String nm,
							   @FormParam("capital") String h,
							   @FormParam("region") String r,
							   @FormParam("surface") double o,
							   @FormParam("population") int i,
							   @FormParam("government")String g,
							   @FormParam("continent")String cn){
		
		Country newLand = service.saveLand(c, nm, h, r, o, i, g, cn);
		System.out.println(newLand);
		return Response.ok(newLand).build();
	}
}