import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, NgForm, FormBuilder, FormArray, FormControl} from '@angular/forms';

import { Ievent } from 'src/app/shared/cerebraapp-form.model';
import { UiService } from 'src/app/COMMON/ui.service';
import { DataService } from '../data.service';
//declare var jQuery: any;

//checkboxes has the (event, database array, formgroup)
function checkboxes(e,a,f){
  for (let data = 0; data < a.length; data++) {

      a.forEach(element => {
        const checkArray: FormArray = f.get( element[data].name ) as FormArray;
        if(e.target.checked){
          checkArray.push(new FormControl(e.target.value) );
        }else{
          let i : number = 0;
      
          checkArray.controls.forEach((item: FormControl) => {
            
            if(item.value == e.target.value){
              checkArray.removeAt(i);
              return;
            }
            i++;
            
          });
        }    
               
      });       
    }
  }
 

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css'],
})
export class RegisterPatientComponent implements OnInit {
  RegPatientForm: FormGroup
  PatientCP: Ievent[]
  step: any= 1

  constructor(private dataS: DataService, private uiService: UiService, private builder: FormBuilder) { }

  ngOnInit(){
    this.resetForm();
    this.setFormState();
  }

  //formgroup
  setFormState(){
  this.RegPatientForm = this.builder.group ({
    FullName: ['', Validators.required],
    StudyNo: ['', Validators.required],
   HospitalNumber: ['', Validators.required],
   Gender: ['', Validators.required],
   DateOBirth: ['', Validators.required],
   AgeAtFirstVisitToPNC: ['', Validators.required],
   EthnicGroup: ['', Validators.required],
   GeopoliticalZone: this.builder.array([], Validators.required),
   WithWhomDoesChildLive: this.builder.array([], Validators.required),
   Informant: ['', Validators.required],
   AnyChangeInCaregiverSinceDiagnosis: this.builder.array([], Validators.required),
   IfYesWho: ['', Validators.required],
   Addreess: ['', Validators.required],
   StateofResidence: ['', Validators.required],
   PhoneNumber: ['', Validators.required],
   EmailAddress: ['', Validators.required],
   DateOfEnrolment: ['', Validators.required],
   DateFirstDiagnosedWithCerebralPalsy: ['', Validators.required],
   AgeAtWhichParentsFirstObservedDelaysInMilestones: ['', Validators.required],
   AgeAtDiagnosisOfCerebralPalsyInMonths: ['', Validators.required],
   WhoMadeTheDiagnosisOfCerebralPalsy: this.builder.array([], Validators.required),
   SourceOfReferral: ['', Validators.required],
   PatternOfLimbInvolvment: this.builder.array([], Validators.required),
   LimbsInvolved: this.builder.array([], Validators.required),
   TypeOfCP: this.builder.array([], Validators.required),
   IfSpasticIsItUnilateralOrBilateralSpasticCP: ['', Validators.required],
   GmfcsClass: ['', Validators.required],
   IsChildReceivingPhysiotherapy: ['', Validators.required], 
   FrequencyOfPhysioSessions: ['', Validators.required],
   AgeAtCommencementOfPhysio: ['', Validators.required],
   DurarionOfPhysiotherapy: ['', Validators.required], 
   AnyOrthopaedicInterventions: ['', Validators.required],
   IfYesTypeOfIntervention: ['', Validators.required],
   DoesChildHaveAnyAssistiveLocomotorDevice: ['', Validators.required],
   IfYesWhoProvidedIt: ['', Validators.required],
   duration_of_pregnancy: ['', Validators.required],
   Term_Preterm: ['', Validators.required],
   types_of_conception: ['', Validators.required],
   if_assisted_which_type: ['', Validators.required],
   complication_in_pregnancy: ['', Validators.required],
   IfYesGiveDetails: ['', Validators.required],
   country_of_birth: ['', Validators.required],
   type_of_pregnancy: ['', Validators.required],
   duration_of_labour: ['', Validators.required],
   mode_of_delivery: ['', Validators.required],
   vacuum_extraction: ['', Validators.required],
   place_of_delivery: ['', Validators.required],
   Did_he_or_she_cry_immediately_after_birth: ['', Validators.required], 
   any_active_resuscitation_at_birth: ['', Validators.required],
   birth_weight: ['', Validators.required],
   time_to_first_feed_after_birth: ['', Validators.required],
   mode_of_feeding_after_birth: ['', Validators.required],
   Glucose_water: ['', Validators.required], 
   any_NICU_admission: ['', Validators.required],
   reason_for_admission: ['', Validators.required],
   duration_of_NICU_admission: ['', Validators.required],
   any_history_of_neonatal_seizures: ['', Validators.required],
   any_history_of_NNJ: ['', Validators.required],
   If_yes_SBR_level: ['', Validators.required],
   treatment_given_for_NNJ: ['', Validators.required],
   any_history_suggestive_of_NN_Sepsis: ['', Validators.required],  
   any_history_suggestive_of_NN_meningitis: ['', Validators.required],
   any_history_of_metabolic_disorder_or_derangement: ['', Validators.required],  
   any_major_illnesses_in_the_past: ['', Validators.required],
   indication_for_hospital_admission: ['', Validators.required],  
   age_at_illness: ['', Validators.required], 
   duration_of_hospitalization: ['', Validators.required],   
   was_admission_due_complication_of_CP: ['', Validators.required],
   was_admission_related_to_the_etiology_of_CP: ['', Validators.required],  
   any_previous_ICU_admission: ['', Validators.required], 
   risk_factor_of_CP: ['', Validators.required],  
   risk_for_CP_identified: ['', Validators.required],
   cranial_MRI_CT_scan: ['', Validators.required],
   if_yes_give_results: ['', Validators.required],
   EEG: ['', Validators.required],
   if_yes_give_details: ['', Validators.required],
   severe_perinatal_asphyxia: ['', Validators.required],
   NN_meningitis: ['', Validators.required],
   Bilirubin_encephalopathy: ['', Validators.required],  
   exposure_to_radiation: ['', Validators.required], 
   intrauterine_infection: ['', Validators.required],  
   NN_Sepsis: ['', Validators.required],
   Maternal_pregnancy_complication: ['', Validators.required],
   prolonged_rupture_of_membranes: ['', Validators.required], 
   congenital_CNS_malformation: ['', Validators.required], 
   any_other_congenital_malformation_state_type: ['', Validators.required],
   maternal_drug_or_alcohol_exposure_state_type_of_drug: ['', Validators.required],  
   prematurity: ['', Validators.required],
   low_birth_weight: ['', Validators.required],
   traumatic_delivery: ['', Validators.required],
   intracranial_infection_metabolic_disorder_state_type: ['', Validators.required],
   metabolic_disorder_state_type: ['', Validators.required],
   traumatic_brain_injury: ['', Validators.required],
   hypoxic_brain_injury: ['', Validators.required], 
   multi_Births: ['', Validators.required],
   stroke: ['', Validators.required],
   give_details: ['', Validators.required],
   any_other_state: ['', Validators.required],
   prenatal_or_perinatal_or_postnatal: ['', Validators.required],
   Presumed_cause_of_CP: ['', Validators.required],
   for_postnatal_Cp_state_age_at_brain_injury: ['', Validators.required],
   Does_a_child_have_a_comorbidities : ['', Validators.required],
   Has_child_received_visual_assesment_by_ophthalmologist : ['', Validators.required],
   Has_child_received_hearing_assessment : ['', Validators.required],
   Visual_impairment : ['', Validators.required],
   types_of_Visual_impairment : ['', Validators.required],
   hearing_impairment : ['', Validators.required],
   types_of_hearing_impairment : ['', Validators.required],
   epilepsy : ['', Validators.required],
   types_of_epilepsy: ['', Validators.required],
   speech_problems: ['', Validators.required],
   intellectual_disability: ['', Validators.required],
   Report_of_IQ_assessment: ['', Validators.required],
   Autism_spectrum_disorder: ['', Validators.required],
   ADHD: ['', Validators.required],
   behaviour_problems: ['', Validators.required],  
   feeding_difficulties: ['', Validators.required],
   growth_impairment: ['', Validators.required],
   microcephaly : ['', Validators.required],
   head_circumference: ['', Validators.required],
   medication_list_if_any: ['', Validators.required],
   father_highest_level_of_education : ['', Validators.required],
   father_occupation: ['', Validators.required],
   mother__highest_level_of_education : ['', Validators.required],
   mother_occupation : ['', Validators.required],
   caregivers_if_not_parent_highest_level_of_education : ['', Validators.required],
   caregivers_occupation : ['', Validators.required],
   any_family_history_of_development_disorder_or_delay : ['', Validators.required],
   Is_child_enrolled_in_the_school : ['', Validators.required],
   types_of_school_not_school_age : ['', Validators.required],
   Has_child_ever_repeated_a_class : ['', Validators.required],
   immunisation_Status : ['', Validators.required],
   Do_parents_have_concern_about_child_growth_and_weight : ['', Validators.required],
   Do_parents_have_concern_about_childs_health : ['', Validators.required],
   Do_parents_have_concern_about_child_eating_pattern : ['', Validators.required],
   Does_child_take_longer_to_eat_milk_than_expected : ['', Validators.required],
   is_child_able_to_eat_and_drink_efficiently : ['', Validators.required],
   is_child_able_to_eat_and_drink_safely_without_choking : ['', Validators.required],
   Is_the_feeding_experience_pleasant_for_the_child_and_family : ['', Validators.required],
   Do_parent_have_to_prepare_food : ['', Validators.required],
   What_are_the_childs_preferred_foods_list_as_necessary : ['', Validators.required],
   Is_child_fluid_intake_adequate : ['', Validators.required],
   Is_urine_output_a_adequate : ['', Validators.required],
   Who_feeds_the_child_in_school : ['', Validators.required],
   Who_feeds_the_child_when_parents_are_unavailable : ['', Validators.required],
   How_is_child_positioned_for_feeding : ['', Validators.required],
   How_frequently_does_child_feed_in_a_day : ['', Validators.required],
   Does_this_child_have_difficulties_with_feeding : ['', Validators.required],
   if_yes_which_type_of_feeding_difficulties : ['', Validators.required],
   Is_this_child_able_to_feed_as_children_of_his_age : ['', Validators.required],
   drooling : ['', Validators.required],
   difficulty_with_swallowing : ['', Validators.required],
   choking_on_feeds : ['', Validators.required],
   Recurrent_aspiration : ['', Validators.required],
   refusal_of_feeds : ['', Validators.required],
   interest_in_some_food_types_only : ['', Validators.required],
   inability_to_chew : ['', Validators.required],
   Need_for_caregiver_assistance_to_feed : ['', Validators.required],
   if_there_concern_with_feeding : ['', Validators.required],
   how_does_illness_affect_childs_feeding : ['', Validators.required],
   Has_the_child_experience_episodes_of_weight_loss_for_dehydration : ['', Validators.required],
   does_the_child_take_any_caloric_protein_vitamins : ['', Validators.required],
   weight_today : ['', Validators.required],
   is_it_appropriate_for_age : ['', Validators.required],
   If_yes_what_was_the_measured_length_or_height : ['', Validators.required],
   Is_child_overweight_observe : ['', Validators.required],
   Does_child_have_any_sign_of_faltering_growth : ['', Validators.required],
   Did_caregiver_receive_any_special_education_from_the_health_care : ['', Validators.required],
   has_child_ever_been_admitted_for_nutritional_rehabilitation : ['', Validators.required],
   Has_child_been_admitted_at_any_time_in_the_hospital : ['', Validators.required],
   if_yes_indication_for_admission_health_facility_and_duration : ['', Validators.required],
   OFC_cm : ['', Validators.required],
   age_OFC_cm : ['', Validators.required],
   MUAC_cm : ['', Validators.required],
   age_MUAC_cm : ['', Validators.required],
   height_or_length : ['', Validators.required],
   age_height_or_length : ['', Validators.required],
   weight : ['', Validators.required],
   age_weight : ['', Validators.required],
   ulnar_length : ['', Validators.required],
   age_ulnar_length : ['', Validators.required],
   chest_circumference : ['', Validators.required],
   age_chest_circumference : ['', Validators.required],
   ofc_or_cc_ratio : ['', Validators.required],
   age_ofcc_or_cc : ['', Validators.required],
   z_score_weight : ['', Validators.required],
   hair_colour : ['', Validators.required],
   hair_texture : ['', Validators.required],
   date_last_seen_in_the_PNC : ['', Validators.required],
   age_at_last_visit_to_PNC : ['', Validators.required],
   total_duration_of_follow_up : ['', Validators.required],
   total_number_of_clinic_visits : ['', Validators.required],
   Help_the_child_attended_the_PNC_in_the_last_one_year : ['', Validators.required],
   Has_the_child_attended_the_pins_in_the_last_6_months : ['', Validators.required],
   
   neck_control : ['', Validators.required],
   independent_sitting : ['', Validators.required],
   crawling : ['', Validators.required],
   walking_with_Assistant : ['', Validators.required],
   independent_walking : ['', Validators.required],
   running : ['', Validators.required],
   independent_climbing : ['', Validators.required],
   other_Sporting_activities : ['', Validators.required],
   telephone_contact_reached_on_phone : ['', Validators.required],
   if_reached_phone_number : ['', Validators.required],
   Alive_lives_with_parents : ['', Validators.required],
   Alive_lives_in_an_industrial_home : ['', Validators.required],
   Alive_lives_with_relation : ['', Validators.required],
   Dead : ['', Validators.required],
   state_age_at_death : ['', Validators.required],
   independence_of_caregiver_assistance_for_daily_living: ['', Validators.required],
   equired_assistant_for_daily_living: ['', Validators.required],
   completely_dependent_on_caregiver_assistance: ['', Validators.required]
  });
}

//database array
Data = [] = [
  {name: "GeopoliticalZone" },
  {name: "WithWhomDoesChildLive"},
  {name: 'AnyChangeInCaregiverSinceDiagnosis'},
  {name: 'WhoMadeTheDiagnosisOfCerebralPalsy'},
  {name: 'PatternOfLimbInvolvment'},
  {name: 'LimbsInvolved'},
  {name: 'TypeOfCP'},
  {name: 'IfSpasticIsItUnilateralOrBilateralSpasticCP'},
  {name:'AnyOrthopaedicInterventions'},
  {name:'DoesChildHaveAnyAssistiveLocomotorDevice'},
  {name:'Term_Preterm'},
  {name:''},
  {name:''},
  {name:''},
  {name:''},
  {name:''},
  {name:''},
  {name:''},
  {name:''},
  {name:''},
  {name:''},
  {name:''},
  {name:''},
  {name:''},
  {name:''},

  ]


Geopolitical: Array<any> = [
  {name: 'NE', value: 'NE'},
  {name: 'NW', value: 'NW'},
  {name: 'NC', value: 'NC'},
  {name: 'SE', value: 'SE'},
  {name: 'SW', value: 'SW'},
  {name: 'SS', value: 'SS'}

];

WithWhom: Array<any> = [
  {name: 'Both Parents', value: 'Both Parents'},
  {name: 'Mother Alone', value: 'Mother Alone'},
  {name: 'Father Alone', value: 'Father Alone'},
  {name: 'Grand Parents', value: 'Grand parents'},
  {name: 'Foaster Home', value: 'Foaster Home'},
  {name: 'Other relatives', value: 'Other relatives'},
  {name: 'Any Other', value: 'Any Other'}
]

YesorNo: Array<any> =[
  {name: 'Yes', value: 'Yes'},
  {name: 'No', value: 'No'}
]

WMTDOCP: Array<any> = [
  {name: 'Child Neurologist', value: 'Child Neurologist'},
  {name: 'Paediatrician', value: 'Paediatrician'},
  {name: 'Resident Doctor', value: 'Resident Doctor'},
  {name: 'Nurse', value: 'Nurse'},
  {name: 'Others', value: 'Others'}
]

POLI: Array<any> = [
  {name: 'Hemiplegia', value: 'Hemiplegia'},
  {name: 'Diplegia', value: 'Diplegia'},
  {name: 'Quadriplegia', value: 'Quadriplegia'},
  {name: 'Triplegia', value: 'Triplegia'},
  {name: 'Monoplegia', value: 'Monoplegia'}
]

LI: Array<any> = [
  {name: 'RUL', value: 'RUL'},
  {name: 'LUL', value: 'LUL'},
  {name: 'RLL', value: 'RLL'},
  {name: 'LLL', value: 'LLL'},
]

TOCP: Array<any> = [
  {name: 'Spastic', value: 'Spastic'},
  {name: 'Dyskinetic', value: 'Dyskinetic'},
  {name: 'Atonic/Hypotonic', value: 'Atonic/Hypotonic'},
  {name: 'Ataxic', value: 'Ataxic'},
  {name:'Mixed', value:'Mixed'}
]

ISITUOBSCP: Array<any> = [
  {name: 'Unilateral', value: 'Unilateral'},
  {name: 'Bilateral', value: 'Bilateral'},
]

T_P: Array<any>=[
  {name: "Term", value: "Term"},
  {name: "Preterm", value: "Preterm"}
]

GeopoliticalZone(e){
  checkboxes(e, this.Data[0], this.RegPatientForm) 
  console.log(this.Data[0] , '=' , e.target.value)
}

WithWhomDoesChildLive(e){
  checkboxes(e, this.Data[1], this.RegPatientForm)
  console.log(this.Data[1],  '=' , e.target.value)
}

AnyChangeInCaregiverSinceDiagnosis(e){
  checkboxes(e, this.Data[2], this.RegPatientForm)
  console.log(this.Data[2],  '=' , e.target.value)
}

WhoMadeTheDiagnosisOfCerebralPalsy(e){
  checkboxes(e, this.Data[3], this.RegPatientForm)
  console.log(this.Data[3],  '=' , e.target.value)
}

PatternOfLimbInvolvment(e){
  checkboxes(e, this.Data[4], this.RegPatientForm)
  console.log(this.Data[4],  '=' , e.target.value)
}

LimbsInvolved(e){
  checkboxes(e, this.Data[5], this.RegPatientForm)
  console.log(this.Data[5],  '=' , e.target.value)
}

TypeOfCP(e){
  checkboxes(e, this.Data[6], this.RegPatientForm)
  console.log(this.Data[6],  '=' , e.target.value)
}
  
IfSpasticIsItUnilateralOrBilateralSpasticCP(e){
  checkboxes(e, this.Data[7], this.RegPatientForm)
  console.log(this.Data[7],  '=' , e.target.value)
}

AnyOrthopaedicInterventions(e){
  checkboxes(e, this.Data[8], this.RegPatientForm)
  console.log(this.Data[8],  '=' , e.target.value)
}

DoesChildHaveAnyAssistiveLocomotorDevice(e){
  checkboxes(e, this.Data[9], this.RegPatientForm)
  console.log(this.Data[9],  '=' , e.target.value)
}

Term_Preterm(e){
  checkboxes(e, this.Data[10], this.RegPatientForm)
  console.log(this.Data[10], e.target.value)
}



//Submit form
  submit(RegPatientForm){
    if(this.RegPatientForm.valid){
      this.dataS.PostPatientsCP(RegPatientForm).subscribe(res => {            
        this.PatientCP = res as Ievent[];
      })
      //this.resetForm();
     }

  }

  //step form to next page
  Next(){
    this.step = this.step + 1;
  }

  //step form to previous page
  Previous(){
    this.step = this.step - 1;
  }


  //reset form
  resetForm(){
    //this.RegPatientForm.reset();
  }

}


